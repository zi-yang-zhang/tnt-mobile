/**
 * Created by robertzzy on 09/07/16.
 */
import * as actionTypes from './actionTypes'
import fetch from 'isomorphic-fetch'
import {checkStatus, parseJSON, endpoint} from '../../common/fetchUtils'
import log from '../../LOGGER'

function createAction(type, payload, error, meta){
	return{
		type: type,
		payload: payload,
		error: error,
		meta: meta
	}
}

function createSimpleAction(type, payload){
	return createAction(type, payload, null, null)
}

function requestExerciseResult(){

}
function renderExerciseResult(result){
	return createSimpleAction(actionTypes.EXERCISE_SEARCH_RESULT_RECEIVED, result)

}

function requestEquipmentResult(){

}
function renderEquipmentResult(result){
	return createSimpleAction(actionTypes.EQUIPMENT_SEARCH_RESULT_RECEIVED, result)

}
function requestMuscleResult(){

}
function renderMuscleResult(result){
	return createSimpleAction(actionTypes.MUSCLE_SEARCH_RESULT_RECEIVED, result)

}
function requestMuscleGroupResult(){

}
function renderMuscleGroupResult(result){
	return createSimpleAction(actionTypes.MUSCLE_GROUP_SEARCH_RESULT_RECEIVED, result)
}

function renderAllEquipmentResult(result){
	return createSimpleAction(actionTypes.GET_ALL_EQUIPMENT_RECEIVED, result)

}

function renderAllMuscleResult(result){
	return createSimpleAction(actionTypes.GET_ALL_MUSCLES_RECEIVED, result)
}


function createEntryRequestSent(){
	return createSimpleAction(actionTypes.CREATE_RESOURCE_REQUEST_SENT, null)
}
function createEntryResultReceived(result){
	return createSimpleAction(actionTypes.RESOURCE_CREATED, result)
}


export function selectModel(type){
	return createSimpleAction(actionTypes.SELECTED_MODEL, type);
}

export function acknowledgeCreateEntryResult(){
	return createSimpleAction(actionTypes.CREATE_RESOURCE_RESULT_ACKNOWLEDGED, null);

}


export function deleteResourceRequested(id){
	return createSimpleAction(actionTypes.DELETE_RESOURCE_REQUESTED, id);
}

export function deleteResourceRequestSent(){
	return createSimpleAction(actionTypes.DELETE_RESOURCE_REQUEST_SENT, null);
}

export function deleteResourceResultReceived(result){
	return createSimpleAction(actionTypes.RESOURCE_DELETED, result);
}

export function deleteRequestCanceled(){
	return createSimpleAction(actionTypes.DELETE_REQUEST_CANCELED, null);
}



export function updateResourceRequestSent(){
	return createSimpleAction(actionTypes.UPDATE_RESOURCE_REQUEST_SENT, null);
}

export function updateResourceResultAcknowledged(){
	return createSimpleAction(actionTypes.UPDATE_RESOURCE_RESULT_ACKNOWLEDGED, null);
}

export function resourceUpdated(result){
	return createSimpleAction(actionTypes.RESOURCE_UPDATED, result);
}


export function resourceToUpdateChosen(resource){
	return createSimpleAction(actionTypes.RESOURCE_TO_UPDATE_CHOSEN, resource);
}


export function updateResourceRequirementFilled(){
	return createSimpleAction(actionTypes.UPDATE_RESOURCE_REQUIREMENT_FILLED, null);
}

export function deleteResourceErrorAcknowledged(){
	return createSimpleAction(actionTypes.DELETE_RESOURCE_ERROR_ACKNOWLEDGED, null);
}


function deleteRequest(id, type){
	return fetch(endpoint()+'api/'+ type+'/' + id, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + window.localStorage.getItem('jwt')
		}
	})
}

function getRequest(id, type){
	return fetch(endpoint()+'api/'+ type+'/' + id, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + window.localStorage.getItem('jwt')
		}
	})
}

function postRequest(request, type){
	return fetch(endpoint()+'api/'+ type+'/', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + window.localStorage.getItem('jwt')
		},
		body: JSON.stringify(request)
	})
}

function handleHttpError(err){
	log(err);
	if(err.status == 401){
		alert('请重新登录');
		window.location.replace(endpoint())
	}
}


export function fetchMuscleGroupResult(keyword){
	let request = {operation: "query", data:{name:{"contains":keyword}}};
	return dispatch =>{

		return postRequest(request, 'muscle_group')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
						dispatch(renderMuscleGroupResult(result));
					}else{
						log('failed to retrieve data')
					}
				})
				.catch(handleHttpError)
	}
}

export function fetchMuscleResult(keyword){
	let request = {operation: "query", data:{name:{"contains":keyword}}};
	return dispatch =>{

		return postRequest(request, 'muscle')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
						dispatch(renderMuscleResult(result));
					}else{
						log('failed to retrieve data')
					}
				})
				.catch(handleHttpError)
	}
}

export function fetchEquipmentResult(keyword){
	let request = {operation: "query", data:{name:{"contains":keyword}}};
	return dispatch =>{

		return postRequest(request, 'equipment')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
						dispatch(renderEquipmentResult(result));
					}else{
						log('failed to retrieve data')
					}
				})
				.catch(handleHttpError)
	}
}

export function fetchExerciseResult(keyword){
	let request = {operation: "query", data:{keyword:[keyword]}};
	return dispatch =>{

		return postRequest(request, 'exercise')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
						dispatch(renderExerciseResult(result));
					}else{
						log('failed to retrieve data')
					}
				})
				.catch(handleHttpError)
	}
}

export function fetchAllMuscle(){
	let request = {operation: "query", data:{name:{"contains":""}}};
	return dispatch =>{
		return postRequest(request, 'muscle')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
						dispatch(renderAllMuscleResult(result));
					}else{
						log('failed to retrieve data')
					}
				})
				.catch(handleHttpError)
	}
}

export function fetchAllEquipment(){
	let request = {operation: "query", data:{name:{"contains":""}}};
	return dispatch =>{

		return postRequest(request, 'equipment')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
						dispatch(renderAllEquipmentResult(result));
					}else{
						log('failed to retrieve data')
					}
				})
				.catch(handleHttpError)
	}
}


export function createMuscleGroup(muscleGroup){
	let request = {operation: "create", data:muscleGroup};
	return dispatch =>{
		dispatch(createEntryRequestSent());
		return postRequest(request, 'muscle_group')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
					}else{
						log('failed to retrieve data')
					}
					dispatch(createEntryResultReceived(result));
				})
				.catch(err => {
					log(err);
					dispatch(createEntryResultReceived(result));
				})
	}
}

export function createMuscle(muscle){
	let request = {operation: "create", data:muscle};
	return dispatch =>{
		dispatch(createEntryRequestSent());
		return postRequest(request, 'muscle')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
					}else{
						log('failed to retrieve data')
					}
					dispatch(createEntryResultReceived(result));
				})
				.catch(err => {
					log(err);
					dispatch(createEntryResultReceived(result));
				})
	}
}

export function createEquipment(equipment){
	let request = {operation: "create", data:equipment};
	return dispatch =>{
		dispatch(createEntryRequestSent());
		return postRequest(request, 'equipment')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
					}else{
						log('failed to retrieve data')
					}
					dispatch(createEntryResultReceived(result));
				})
				.catch(err => {
					log(err);
					dispatch(createEntryResultReceived(result));
				})
	}
}

export function createExercise(exercise){
	let request = {operation: "create", data:exercise};
	return dispatch =>{
		dispatch(createEntryRequestSent());
		return postRequest(request, 'exercise')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
					}else{
						log('failed to retrieve data')
					}
					dispatch(createEntryResultReceived(result));
				})
				.catch(err => {
					log(err);
					dispatch(createEntryResultReceived(result));
				})
	}
}


export function deleteMuscleGroup(id){
	return dispatch =>{
		dispatch(deleteResourceRequestSent());
		return deleteRequest(id, 'muscle_group')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
					}else{
						log('failed to retrieve data')
					}
					dispatch(deleteResourceResultReceived(result));
				})
				.catch(err => {
					log(err);
					dispatch(deleteResourceResultReceived(result));
				})
	}
}

export function deleteMuscle(id){
	return dispatch =>{
		dispatch(deleteResourceRequestSent());
		return deleteRequest(id, 'muscle')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
					}else{
						log('failed to retrieve data')
					}
					dispatch(deleteResourceResultReceived(result));
				})
				.catch(err => {
					log(err);
					dispatch(deleteResourceResultReceived(result));
				})
	}
}

export function deleteEquipment(id){
	return dispatch =>{
		dispatch(deleteResourceRequestSent());
		return deleteRequest(id, 'equipment')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
					}else{
						log('failed to retrieve data')
					}
					dispatch(deleteResourceResultReceived(result));
				})
				.catch(err => {
					log(err);
					dispatch(deleteResourceResultReceived(result));
				})
	}
}

export function deleteExercise(id){
	return dispatch =>{
		dispatch(deleteResourceRequestSent());
		return deleteRequest(id, 'exercise')
				.then(checkStatus)
				.then(parseJSON)
				.then(result => {
					if(result.success){
						log('data retrieved');
						log(result.data);
					}else{
						log('failed to retrieve data')
					}
					dispatch(deleteResourceResultReceived(result));
				})
				.catch(err => {
					log(err);
					dispatch(deleteResourceResultReceived(result));
				})
	}
}


export function updateMuscleGroup(muscleGroup){
	let request = {operation: "update", data:muscleGroup};
	return dispatch =>{
		dispatch(updateResourceRequestSent());
		return postRequest(request, 'muscle_group')
			.then(checkStatus)
			.then(parseJSON)
			.then(result => {
				if(result.success){
					log('data retrieved');
					log(result.data);
				}else{
					log('failed to retrieve data')
				}
				dispatch(resourceUpdated(result));
			})
			.catch(err => {
				log(err);
				dispatch(resourceUpdated(result));
			})
	}
}

export function updateMuscle(muscle){
	let request = {operation: "update", data:muscle};
	return dispatch =>{
		dispatch(updateResourceRequestSent());
		return postRequest(request, 'muscle')
			.then(checkStatus)
			.then(parseJSON)
			.then(result => {
				if(result.success){
					log('data retrieved');
					log(result.data);
				}else{
					log('failed to retrieve data')
				}
				dispatch(resourceUpdated(result));
			})
			.catch(err => {
				log(err);
				dispatch(resourceUpdated(result));
			})
	}
}

export function updateEquipment(equipment){
	let request = {operation: "update", data:equipment};
	return dispatch =>{
		dispatch(updateResourceRequestSent());
		return postRequest(request, 'equipment')
			.then(checkStatus)
			.then(parseJSON)
			.then(result => {
				if(result.success){
					log('data retrieved');
					log(result.data);
				}else{
					log('failed to retrieve data')
				}
				dispatch(resourceUpdated(result));
			})
			.catch(err => {
				log(err);
				dispatch(resourceUpdated(result));
			})
	}
}

export function updateExercise(exercise){
	let request = {operation: "update", data:exercise};
	return dispatch =>{
		dispatch(updateResourceRequestSent());
		return postRequest(request, 'exercise')
			.then(checkStatus)
			.then(parseJSON)
			.then(result => {
				if(result.success){
					log('data retrieved');
					log(result.data);
				}else{
					log('failed to retrieve data')
				}
				dispatch(resourceUpdated(result));
			})
			.catch(err => {
				log(err);
				dispatch(resourceUpdated(result));
			})
	}
}

