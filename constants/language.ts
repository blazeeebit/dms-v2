type LANGUAGE_PREFERENCE_PROPS = {
    [key in "ENGLISH" | "TURKISH"]: {
      content:string
      
    }

  };
type LANGUAGE_CONTENT= {
  SEARCH:LANGUAGE_PREFERENCE_PROPS
  
}
export const DMS_CONTENT:LANGUAGE_CONTENT={
  SEARCH:{
    ENGLISH:{
      content:"Search"
    },
    TURKISH:{
      content:"Arama"
    }

  }
  
}