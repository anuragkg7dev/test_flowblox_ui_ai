
export const getValidateInitAsTrue=()=>{
   return  JSON.parse(JSON.stringify({flag:true, error:""}));
}

export const getValidationRequiredErrorFlagFalse=()=>{
    return  JSON.parse(JSON.stringify({flag:false, error:"Required"}));
 }

export const validateRequired = (value, callback) => {
   
    if (!value) {
        callback(getValidationRequiredErrorFlagFalse())
        return false
    } else {
        callback(getValidateInitAsTrue())
        return true
    }
   
  }

export const validate = (schemas, field, value) => {
    try {
        schemas[field].validateSync(value);
        return null;
    } catch (err) {
        return err.message;
    }
};