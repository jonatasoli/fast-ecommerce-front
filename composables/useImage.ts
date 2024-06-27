export const useImageFromBase64 = (base64Image: MaybeRefOrGetter<string>) => {
  return `data:image/jpeg;base64,${unref(base64Image)}`
}
