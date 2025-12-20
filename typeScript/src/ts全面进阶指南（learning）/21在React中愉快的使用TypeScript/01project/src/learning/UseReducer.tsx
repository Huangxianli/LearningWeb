import { useReducer } from 'react';
interface NameState {
  firstName?: string;
  lastName?: string;
}
type NameAction = {
  type: 'setFirstName' | 'setLastName';
  payload: string;
};
function nameReducer(nameState: NameState, nameAction: NameAction): NameState {
  switch (nameAction.type) {
    case 'setFirstName': {
      return { ...nameState, firstName: nameAction.payload };
    }
    case 'setLastName': {
      return { ...nameState, lastName: nameAction.payload };
    }
    default: {
      return nameState;
    }
  }
}

export default function UseReducer() {
  const [name, dispatchName] = useReducer(nameReducer, {});
  name; // NameState
  dispatchName; // React.Dispatch<NameAction>

  return <div>useReducer</div>;
}
