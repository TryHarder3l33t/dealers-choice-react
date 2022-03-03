//import React from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const SingleContact = (props) => {
  const { id, name, bio, imgUrl } = props.contact;
  const { back } = props;
  const { backButton } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bio}
          </Typography>
          <div>
            {back ? (
              <a onClick={() => backButton()}>
                <Typography gutterBottom variant="h6" component="div">
                  Go Back
                </Typography>
              </a>
            ) : (
              <div></div>
            )}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SingleContact;
