const LS_KEY = 'GR_LOCATION'

export enum Locations {
  BR,
  EU,
}

export const useLocation = () => {
  const location = ref('')
  const storageLocation = useLocalStorage(LS_KEY, location, {
    listenToStorageChanges: true,
    deep: true,
  })

  return {
    location,
    setLocation: (newValue) => {
      location.value = newValue
      storageLocation.value = newValue
    },
  }
}
