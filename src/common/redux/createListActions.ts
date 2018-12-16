export const createListActions = (entityName: string) => {
  const actionTypes = {
    FAILURE: `${entityName}_LIST/FAILURE`,
    LOAD: `${entityName}_LIST/LOAD`,
    LOAD_SUCCESS: `${entityName}_LIST/LOAD_SUCCESS`,
    LOADING: `${entityName}_LIST/LOADING`
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
