import React from "react";
import { Avatar } from "@mui/material";
import { avatarNames } from "../threeJs/reducers/userReducer";
import "./customAvatarStyle.css";

interface AvatarInterface {
    avatarName: avatarNames;
    size?: number;
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}
export default function CustomAvatar({avatarName, size = 24, active, disabled, onClick}: AvatarInterface) {
    function className(){
        let className = "";
        if(disabled) className += "is-disabled";
        if(active) className += "is-active";
        return className
    }
    return (
        <div className="avatar-container">
            <Avatar
            onClick={onClick}
            className={`mb-2 cursor-pointer avatar-style ${className()}`}
            alt={avatarName}
            src={`./assets/avatar/${avatarName}.png`}
            sx={{ width: size, height: size }}
          />
          <h3><b>{avatarName.toUpperCase()}</b></h3>
        </div>
    )
}