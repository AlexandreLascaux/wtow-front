import { avatarNames } from "./userReducer"

export const initialMeteo = {
    rainProperties: {
      rain: false,
      rainPrecipitation: 1500
  },
  snowProperties: {
      snow: false,
      snowPrecipitation: 3000,
  },
  cloudProperties: {
    cloud: true,
    cloudCover: 4,
    windSpeed: 1,
}
  }
  
  export const initialClothe = {
    hat: {
      type: "winter"
    },
    tshirt: {
      type: "summer"
    },
    pant: {
      type: "spring"
    },
  }

  export const initialUser = {
      name: "",
      avatar: "toufan" as avatarNames,
  }
