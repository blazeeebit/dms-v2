type ERROR_STATES = {
    [key in "ENGLISH" | "TURKISH"]: {
      status: number;
      message: string;
      userId?: string;
      type?: string;
    };
  };
  
  type ERROR_HANDLERS = {
    REGISTERED: ERROR_STATES;
    SOMETHING_WENT_WRONG: ERROR_STATES;
    DUPICATE: ERROR_STATES;
    USERNAME: ERROR_STATES;
    CONVERTED: ERROR_STATES;
    VERIFIED: ERROR_STATES;
    LANGUAGE: ERROR_STATES;
    PAYMENT: ERROR_STATES;
    PAYMENT_PRODUCT: ERROR_STATES;
    INVALID_SECRET: ERROR_STATES;
    CREATED_LISTING: ERROR_STATES;
    NO_LISTING: ERROR_STATES;
    LISTINGS_FOUND: ERROR_STATES;
    PUBLISHED: ERROR_STATES;
    UNPUBLISHED: ERROR_STATES;
    SERVICE_CREATED: ERROR_STATES;
    SERVICE_EXISTS: ERROR_STATES;
    SERVICE_DISABLED: ERROR_STATES;
    SERVICE_ENABLED: ERROR_STATES;
    DESCRIPTION_GENERATED: ERROR_STATES;
    INFO_UPDATED: ERROR_STATES;
    AI_ITEGRATED: ERROR_STATES;
    FULL_PAYMENT: ERROR_STATES;
    PARTIAL_PAYMENT: ERROR_STATES;
  };
  
  export const ACTION_ERROR_HANDLERS: ERROR_HANDLERS = {
    REGISTERED: {
      ENGLISH: {
        status: 200,
        message: "User successfully created",
      },
      TURKISH: {
        status: 200,
        message: "Kullanıcı başarıyla oluşturuldu",
      },
    },
    SOMETHING_WENT_WRONG: {
      ENGLISH: {
        status: 500,
        message: "Oops! something went wrong",
      },
      TURKISH: {
        status: 500,
        message: "Hata! bir şeyler yanlış gitti",
      },
    },
    DUPICATE: {
      ENGLISH: {
        status: 400,
        message: "User already exists",
      },
      TURKISH: {
        status: 400,
        message: "Kullanıcı zaten var",
      },
    },
    USERNAME: {
      ENGLISH: {
        status: 400,
        message: "Username already exists",
      },
      TURKISH: {
        status: 400,
        message: "Kullanıcı adı zaten var",
      },
    },
    CONVERTED: {
      ENGLISH: {
        status: 200,
        message: "User changed to moderator",
      },
      TURKISH: {
        status: 200,
        message: "Kullanıcı moderatör olarak değiştirildi",
      },
    },
    VERIFIED: {
      ENGLISH: {
        status: 200,
        message: "User has been verified",
      },
      TURKISH: {
        status: 200,
        message: "Kullanıcı doğrulandı",
      },
    },
    LANGUAGE: {
      ENGLISH: {
        status: 200,
        message: "Language preference updated",
      },
      TURKISH: {
        status: 200,
        message: "Dil tercihi güncellendi",
      },
    },
    PAYMENT: {
      ENGLISH: {
        status: 200,
        message: "Stripe api integrated",
      },
      TURKISH: {
        status: 200,
        message: "Stripe API entegre",
      },
    },
    PAYMENT_PRODUCT: {
      ENGLISH: {
        status: 200,
        message: "Payment Plan Created",
      },
      TURKISH: {
        status: 200,
        message: "Ödeme Planı Oluşturuldu",
      },
    },
    INVALID_SECRET: {
      ENGLISH: {
        status: 400,
        message: "Your API key is invalid! Try again",
      },
      TURKISH: {
        status: 400,
        message: "Your API key is invalid! Try again",
      },
    },
    CREATED_LISTING: {
      ENGLISH: {
        status: 200,
        message: "You created a new dorm listing",
      },
      TURKISH: {
        status: 200,
        message: "Yeni bir yurt listesi oluşturdunuz",
      },
    },
    NO_LISTING: {
      ENGLISH: {
        status: 400,
        message: "You have not created any listings",
      },
      TURKISH: {
        status: 400,
        message: "Herhangi bir liste oluşturmadınız",
      },
    },
    LISTINGS_FOUND: {
      ENGLISH: {
        status: 200,
        message: "You have active listings",
      },
      TURKISH: {
        status: 200,
        message: "Aktif ilanlarınız var",
      },
    },
    PUBLISHED: {
      ENGLISH: {
        status: 200,
        message: "Your listing is active",
      },
      TURKISH: {
        status: 200,
        message: "Girişiniz aktif",
      },
    },
    UNPUBLISHED: {
      ENGLISH: {
        status: 200,
        message: "Your listing is not active",
      },
      TURKISH: {
        status: 200,
        message: "Girişiniz aktif değil",
      },
    },
    SERVICE_CREATED: {
      ENGLISH: {
        status: 200,
        message: "Service was created",
      },
      TURKISH: {
        status: 200,
        message: "Hizmet oluşturuldu",
      },
    },
    SERVICE_EXISTS: {
      ENGLISH: {
        status: 200,
        message: "Service already exisits",
      },
      TURKISH: {
        status: 200,
        message: "Hizmet zaten mevcut",
      },
    },
    SERVICE_DISABLED: {
      ENGLISH: {
        status: 200,
        message: "Service has been disabled",
      },
      TURKISH: {
        status: 200,
        message: "Hizmet devre dışı bırakıldı",
      },
    },
    SERVICE_ENABLED: {
      ENGLISH: {
        status: 200,
        message: "Service is enabled",
      },
      TURKISH: {
        status: 200,
        message: "Hizmet etkinleştirildi",
      },
    },
    DESCRIPTION_GENERATED: {
      ENGLISH: {
        status: 200,
        message: "Your description is generated",
      },
      TURKISH: {
        status: 200,
        message: "Açıklamanız oluşturuldu",
      },
    },
    INFO_UPDATED: {
      ENGLISH: {
        status: 200,
        message: "Your info is updated",
      },
      TURKISH: {
        status: 200,
        message: "Bilgileriniz güncellendi",
      },
    },
    AI_ITEGRATED: {
      ENGLISH: {
        status: 200,
        message: "You have integrated OpenAI",
      },
      TURKISH: {
        status: 200,
        message: "OpenAI'yi entegre ettiniz",
      },
    },
    FULL_PAYMENT : {
      ENGLISH:{
        status: 200,
        message: "You have made  a full payment for this product.",
      },
      TURKISH :{
        status: 200,
        message: "Bu ürün için tam ödeme yaptınız.",
      }
    },
    PARTIAL_PAYMENT : {
      ENGLISH:{
        status: 200,
        message: "You have made  a partial payment for this product.",
      },
      TURKISH :{
        status: 200,
        message: "Bu ürün için kısmi ödeme yaptınız.",
      }
    },
  
  };
  