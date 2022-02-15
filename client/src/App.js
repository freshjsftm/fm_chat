import {Formik, Form, Field} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as chatActionsCreators from './actions/actionCreatos';

function App() {
  const {isFetching, error, messages} = useSelector(chat=>state.chat);
  const dispatch = useDispatch();
  const {getMessageRequest, createMessageRequest} = bindActionCreators(chatActionsCreators, dispatch);
  useEffect(() => {
    getMessageRequest();
  }, []);

  return (
    <div>
      <h2>
        List messages
      </h2>
      <ul>
        {
          messages.map((msg)=>(<li key={msg._id}>{msg.text}</li>))
        }
      </ul>
    </div>
  );
}

export default App;
