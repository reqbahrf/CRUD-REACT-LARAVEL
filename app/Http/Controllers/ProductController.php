<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
      /**
     * Display a listing of the products.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::get();
        $products->transform(function ($product) {
            if ($product->product_image_url) {
                $product->product_image_url = asset('storage/' . $product->product_image_url);
            }
            return $product;
        });

        return response()->json($products, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product-image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',  // Validate the image
            'product-name' => 'required|string|unique:products_info,product_name',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        try {

            if ($request->hasFile('product-image')) {
                $image = $request->file('product-image');
                $fileName = Str::slug($request->input('product-name')) . '.' . $image->getClientOriginalExtension();
                $imagePath = Storage::disk('public')->putFileAs('Products-image', $image, uniqid() . '_' . $fileName);

                $validatedData['product_image_url'] = $imagePath;
            }

            // Create the new product
           Product::create([
                'product_image_url' => $validatedData['product_image_url'],
                'product_name' => $validatedData['product-name'],
                'product_categories' => $validatedData['category'],
                'quantity' => $validatedData['quantity'],
                'price' => $validatedData['price'],
            ]);


            return response()->json(['message' => 'Product Added Successfully'], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show($id, Request $request)
    {
        try {
            $product = Product::findOrFail($id);
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
            return response()->json($product, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'product-image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',  // Validate the image
            'Action' => 'required|in:UPDATE,ORDER',
            'name' => 'required_if:Action,UPDATE',
            'category' => 'required_if:Action,UPDATE',
            'quantity' => 'required_if:Action,UPDATE|numeric',
            'price' => 'required_if:Action,UPDATE|numeric',
            'Ordered_quantity' => 'required_if:Action,ORDER|numeric',
            'Ordered_Total' => 'required_if:Action,ORDER|numeric',
        ]);
        try {

            switch($validated['Action']) {
                case 'UPDATE':
                    return $this->updateProduct($id, $validated);
                    break;
                case 'ORDER':
                    return $this->orderProduct($id, $validated);
                    break;
            }

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
            $product->product_image_url && Storage::disk('public')->delete($product->product_image_url);
            $product->delete();
            return response()->json(['message' => 'Product Deleted Successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

/**
 * Updates the specified product in the database with the given validated data.
 *
 * @param int $id The ID of the product to update.
 * @param array $validated The validated data containing the updated product details, including optional image.
 *
 * @return \Illuminate\Http\JsonResponse JSON response indicating success or error message.
 *
 * @throws \Illuminate\Database\Eloquent\ModelNotFoundException If the product is not found.
 * @throws \Exception If there is an error during the update process.
 */
    protected function updateProduct($id, $validated)
    {
        try {
            $product = Product::findOrFail($id);
            $product->product_image_url && Storage::disk('public')->delete($product->product_image_url);

            $updateData = [
                'product_name' => $validated['name'],
                'product_categories' => $validated['category'],
                'quantity' => $validated['quantity'],
                'price' => $validated['price'],
            ];

            if (isset($validated['product-image'])) {
                $image = $validated['product-image'];
                $fileName = Str::slug($validated['name']) . '.' . $image->getClientOriginalExtension();
                $imagePath = Storage::disk('public')
                    ->putFileAs('Products-image', $image, uniqid() . '_' . $fileName);

                $updateData = array_merge($updateData, ['product_image_url' => $imagePath]);
            }

            $product->update($updateData);

            return response()->json(['message' => 'Product Updated Successfully'], 200);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

/**
 * Places an order for a specified product, updates its quantity, and records sales information.
 *
 * @param int $id The ID of the product to order.
 * @param array $validated The validated data containing ordered quantity and total price.
 *
 * @return \Illuminate\Http\JsonResponse JSON response indicating success or error message.
 *
 * @throws \Illuminate\Database\Eloquent\ModelNotFoundException If the product is not found.
 * @throws \Exception If there is an error during the ordering process.
 */
    protected function orderProduct($id,$validated)
    {
        try {
                    $orderedProductQuantity = $validated['Ordered_quantity'];
                    $orderedProductTotalPrice = $validated['Ordered_Total'];
                    $product = Product::find($id);

                    if ($orderedProductQuantity > $product->quantity) {
                        return response()->json(['error' => 'Insufficient quantity in stock'], 422);
                    }

                    $product->quantity -= $orderedProductQuantity;
                    $product->salesInfo()->create(
                        [
                            'product_name' => $product->product_name,
                            'total_qty' =>  $orderedProductQuantity,
                            'total_price' => $orderedProductTotalPrice
                        ]);
                    $product->save();
                    return response()->json(['message' => 'Product Ordered Successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }
}
