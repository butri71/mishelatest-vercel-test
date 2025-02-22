import { 
  Martini, 
  MessageCircleQuestion, 
  GraduationCap, 
  History, 
  SquareArrowRight,
  List,
  ShoppingBasket
} from "lucide-react";

const icons = {
  Martini,
  MessageCircleQuestion,
  GraduationCap,
  History,
  SquareArrowRight,
  List,
  ShoppingBasket
};

export default function LineSection({ title, icon = "" }) {
  const IconComponent = icons[icon];

  return (
    <div className="line-container-left">
      {/* <div className="line"></div> */}

      <h2 className="line-text line-text--left">
        {IconComponent && <IconComponent className="service-icon"  strokeWidth={3}/>}
        {title}
      </h2>
      <div className="line"></div>
    </div>
  );
}
