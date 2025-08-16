
export const ACTION_ADD = "ADD"
export const ACTION_EDIT = "EDIT"

export const CONFIRM = "Confirm"
export const CLOSE = "Close"
export const CANCEL = "Cancel"


export const getDeleteDescription = (item) => {
  return "Are you sure you want to delete " + item + "? This action cannot be undone, and all associated data will be permanently removed.";
}

export const messages = {
  close:"You have unsaved changes in the wizard. If you close now, all your progress will be lost. Are you sure you want to close?",

}

export const configuration = {
  aiFormalityOptions: [
    { label: "Professional", value: "professional" },
    { label: "Casual", value: "casual" }
  ],

  aiEngineOptions: [
    { label: "OpenAi", value: "openAi" },
    { label: "Grok", value: "grok" }
  ],

  openAiModelOptions: [
    { label: "Model 1", value: "Model 1" },
    { label: "Model 2", value: "Model 2" }
  ],

  grokModelOptions: [
    { label: "Model 3", value: "Model 3" },
    { label: "Model 4", value: "Model 4" }
  ],

  outputSourceOptions: [
    { label: "Source 1", value: "Source 1" },
    { label: "Source 2", value: "Source 2" }
  ],

  frequencyOptions: [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Custom", value: "Custom" },
  ],
};



