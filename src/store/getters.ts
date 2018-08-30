
const dataGetters = {
  load: (state: any) => state.loading,
};

const userGetters = {
  auth: (state: any) => state.auth,
};

export {
  dataGetters,
  userGetters
}