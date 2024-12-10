
export default function Footer() {
    return (
        <footer className="bg-teal-800 px-4 py-8 text-white">
        <div className="container mx-auto flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">Malativas.com</h2>
            <p className="mt-2">Contact Us</p>
            <p>Email: info@Malativas.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold">About Us</h3>
            <h3 className="font-bold">Follow Us</h3>
            <div className="mt-2 flex space-x-4">
              <a href="#" className="text-white"
                ><img
                  src='/images/footer_image_assets/linkedin.png'
                  alt="LinkedIn"
                  className="h-6 w-6"
              /></a>
              <a href="#" className="text-white"
                ><img
                  src='/images/footer_image_assets/youtube-play.png'
                  alt="YouTube"
                  className="h-6 w-6"
              /></a>
              <a href="#" className="text-white"
                ><img
                  src='/images/footer_image_assets/instagram-new.png'
                  alt="Instagram"
                  className="h-6 w-6"
              /></a>
              <a href="#" className="text-white"
                ><img
                  src='/images/footer_image_assets/twitter.png'
                  alt="Twitter"
                  className="h-6 w-6"
              /></a>
              <a href="#" className="text-white"
                ><img src='/images/footer_image_assets/tiktok.png' alt="Tiktok" className="h-6 w-6"
              /></a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">© Malativas {new Date().getFullYear()}</div>
      </footer>
    )
}
