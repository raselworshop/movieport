import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from "./../assets/image-1.jpg";
import image2 from "./../assets/image-2.jpg";
import image3 from "./../assets/image-3.jpg";
import image4 from "./../assets/image-4.jpg";
import image5 from "./../assets/image-5.jpg";
import image6 from "./../assets/image-6.jpg";

const Carosole = () => {
    return (
        <div className="max-h-[60vh] overflow-hidden">
            <Carousel>
                <div className="h-full">
                    <img src={image1} alt="Legend 1" className="w-full h-full object-cover" />
                    <p className="legend">Legend 1</p>
                </div>
                <div className="h-full">
                    <img src={image2} alt="Legend 2" className="w-full h-full object-cover" />
                    <p className="legend">Legend 2</p>
                </div>
                <div className="h-full">
                    <img src={image3} alt="Legend 3" className="w-full h-full object-cover" />
                    <p className="legend">Legend 3</p>
                </div>
                <div className="h-full">
                    <img src={image4} alt="Legend 4" className="w-full h-full object-cover" />
                    <p className="legend">Legend 4</p>
                </div>
                <div className="h-full">
                    <img src={image5} alt="Legend 5" className="w-full h-full object-cover" />
                    <p className="legend">Legend 5</p>
                </div>
                <div className="h-full">
                    <img src={image6} alt="Legend 6" className="w-full h-full object-cover" />
                    <p className="legend">Legend 6</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Carosole;
