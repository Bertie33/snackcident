import {FamilyState, FamilyMember, FamilyAction} from "@/models/familyModels";

export default function FamilyReducer(
    state: FamilyState,
    action: FamilyAction
): FamilyState {
    switch (action.type) {

        case "HYDRATE":
            return action.payload;

        case "ADD_MEMBER":
            return {
                ...state,
                familyMembers: [...state.familyMembers, action.payload],
            };

        case "REMOVE_MEMBER":
            return {
                ...state,
                familyMembers: state.familyMembers.filter(
                    (member) => member.id !== action.payload.id
                ),
            };

        case "CHANGE_MEMBER":
            return {
                ...state,
                familyMembers: state.familyMembers.map((member) =>
                    member.id === action.payload.id
                        ? {...member, ...action.payload.updates}
                        : member
                ),
            };


        case "SET_FAMILY_NAME":
            return {
                ...state,
                familyName: action.payload,
            };



        default:
            return state;
    }
}