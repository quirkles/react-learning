export interface SessionUser {
    id: string;
    name: string;
    email: string
}

export type SessionUserState = SessionUser | null


interface BaseAction {
    type: string
}

interface LoginAction extends BaseAction {
    type: 'LOGIN';
    user: SessionUser;
}

interface LogoutAction extends BaseAction {
    type: 'LOGOUT',
}

interface UpdateAction extends BaseAction {
    type: 'UPDATE',
    update: Partial<Omit<SessionUser, 'id'>>;
}

export type SessionUserAction = LogoutAction | LoginAction | UpdateAction

export function sessionUserReducer(sessionUserState: SessionUserState, action: SessionUserAction): SessionUserState {
    switch (action.type){
        case "LOGIN":
            return action.user
        case "LOGOUT":
            return null
        case "UPDATE":
            if(sessionUserState === null) {
                return sessionUserState
            }
            return {
                ...sessionUserState,
                ...action.update
            }
    }
}
