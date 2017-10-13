import React from 'react';
import ProjectList from './ProjectList.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../../actions';


class DashboardHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
    this.onProjectClick = this.onProjectClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/getProjectsForUser', {params: { username: this.props.loggedInUser.username }}) // this.props.loggedInUser.username (import it below)
      .then((response) => {
        this.setState({
          projects: response.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }


  onProjectClick(obj, sections) {
    obj['sections'] = sections;
    this.props.actions.changeCurrentProject(obj);
  }

  render () {
    return (
      <div>
        <p>PROJECT HOME</p>
        { this.state.projects.map((project, i) => (
          <ProjectList
            onProjectClick={this.onProjectClick}
            project={project}
            key={i}
          />
        ))}
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  console.log('LOG WITHIN DASHBOARD', state);
  return ({
    router: state.router,
    currentProject: state.currentProject,
    loggedInUser: state.loggedInUser
  });
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (DashboardHome);