import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../States/CustomTaskListState';
import CustomTaskList from './CustomTaskList';

const mapStateToProps = (state) => ({
    isOpen: state['sample'].customTaskList.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  dismissBar: bindActionCreators(Actions.dismissBar, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomTaskList);
