export const useImageFromBase64 = (base64Image: MaybeRefOrGetter<string>) => {
  return computed(() => `data:image/jpeg;base64,${unref(base64Image)}`)
}
