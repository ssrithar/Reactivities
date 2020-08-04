import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

// interface IState {
//   activities: IActivity[]
// }

// class App extends Component<{}, IState> {
//   readonly state: IState = {
//     activities: []
//   }

//   componentDidMount() {
//     axios.get<IActivity[]>('http://localhost:5000/api/activities')
//       .then((response) => {
//           this.setState({
//             activities: response.data
//           })
//       });
//   }

//   render() {
//     return (
//           <div>
//             <Header as='h2'>
//               <Icon name='users' />
//               <Header.Content>Reactivities</Header.Content>
//             </Header>
//             <List>
//             {this.state.activities.map((activity) => (
//               <List.Item key={activity.id}>{activity.title}</List.Item>
//             ))}
//             </List>
//           </div>
//         );
//   }
// }

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([
      ...activities.filter((a) => a.id !== activity.id),
      activity,
    ]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((a) => a.id !== id)]);
  };

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        let activities: IActivity[] = [];
        response.data.forEach((a) => {
          a.date = a.date.split(".") && a.date.split(".")[0];
          activities.push(a);
        });
        setActivities(activities);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
