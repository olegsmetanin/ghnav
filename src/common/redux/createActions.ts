export const createActions = (entityName: string) => {
  const actionTypes = {
    FAILURE: `${entityName}/FAILURE`,
    LOAD: `${entityName}/LOAD`,
    LOAD_SUCCESS: `${entityName}/LOAD_SUCCESS`
  }

  function failure(error) {
    return {
      type: actionTypes.FAILURE,
      error
    }
  }

  function load(query: any) {
    return {
      type: actionTypes.LOAD,
      payload: query
    }
  }

  function loadSuccess(valueNquery: any) {
    return {
      type: actionTypes.LOAD_SUCCESS,
      payload: valueNquery
    }
  }

  return {
    actionTypes,
    failure,
    load,
    loadSuccess
  }
}
