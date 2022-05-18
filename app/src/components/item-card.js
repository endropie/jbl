import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { useMediaQuery } from "./../lib/style";


const cardStyle = {
  width: "100%",
}

export default function ItemCard (props) {
  
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Card style={cardStyle}>
      <Card.Content>
        <Image
          fluid
          style={{
            height: `${isMobile ? 150 : 200 }px`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          src={props?.imgsrc || "/blank-image.png"}
        />
      </Card.Content>
      <Card.Content>
        <Card.Header>{props?.name || "Name undefined"}</Card.Header>
        <Card.Meta>Rp. {props.price}</Card.Meta>
      </Card.Content>
    </Card>
  );
}


