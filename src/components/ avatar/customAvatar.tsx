import React from "react";
import { Avatar } from "@mui/material";
import { avatarNames } from "../threeJs/reducers/userReducer";
import "./customAvatarStyle.css";

interface AvatarInterface {
    avatarName: avatarNames;
    width?: number;
}
export default function CustomAvatar({avatarName, width = 24}: AvatarInterface) {
    
    return (
        <div className="avatar-container">
            <Avatar
            alt={avatarName}
            src={`/assets/${avatarName}.png`}
            sx={{ width: width, height: width }}
          />
          <h3><b>{avatarName.toUpperCase()}</b></h3>
        </div>
    )
}