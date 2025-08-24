import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <Carousel className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl mx-auto my-10 sm:my-16 lg:my-20">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {category.map((cat, index) => (
                        <CarouselItem 
                            key={cat} 
                            className="pl-2 md:pl-4 basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                        >
                            <Button 
                                onClick={() => searchJobHandler(cat)} 
                                variant="outline" 
                                className="w-full rounded-full text-xs sm:text-sm md:text-base py-2 px-3 sm:py-3 sm:px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 whitespace-nowrap"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex -left-4 md:-left-6" />
                <CarouselNext className="hidden sm:flex -right-4 md:-right-6" />
            </Carousel>
            
            {/* Mobile fallback - show all buttons stacked on very small screens */}
            <div className="sm:hidden grid grid-cols-2 gap-3 max-w-sm mx-auto">
                {category.map((cat) => (
                    <Button 
                        key={cat}
                        onClick={() => searchJobHandler(cat)} 
                        variant="outline" 
                        className="rounded-full text-xs py-2 px-3 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    >
                        {cat}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default CategoryCarousel