export const validateName = (value, nameLabel) => {
  let cLabel = nameLabel ?? ''
  if (!value) {
    return cLabel + " is required";
  }
  if (value.length < 2) {
    return cLabel + " must be at least 2 characters";
  }
  if (value.length > 50) {
    return cLabel + " cannot exceed 50 characters";
  }
  if (!/^[A-Za-z\s]+$/.test(value)) {
    return cLabel + " can only contain letters and spaces";
  }
  return "";
};