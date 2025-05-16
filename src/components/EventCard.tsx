
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

export interface EventProps {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  price: string;
}

const EventCard = ({ id, title, image, date, location, price }: EventProps) => {
  return (
    <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 font-medium text-black">
            <span>R$ {price}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/eventos/${id}`} className="w-full">
          <Button className="w-full bg-evently hover:bg-evently-light">
            Comprar Ingresso
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
