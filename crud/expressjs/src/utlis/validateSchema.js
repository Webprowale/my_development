export const createUserValidateSchema ={
    and:{
        isLength:{
            options:{
                min: 5,
                max: 20
            },
        },
      notEmpty: true,
      isString: true,
    }
    
};