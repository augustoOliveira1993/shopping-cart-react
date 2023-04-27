import {AiFillStar, AiOutlineStar} from "react-icons/all.js";

export const Rating = ({rating, onClick, style}) => {
    return (
        <div>
            {[1, 2, 3, 4, 5].map((_, i) => (
                <span key={i} onClick={() => onClick(i)} style={style}>
                    {rating > i ? (
                        <AiFillStar fontSize="15px"/>
                    ) : (
                        <AiOutlineStar fontSize="15px"/>
                    )}
                </span>
            ))}
        </div>
    );
};
