import React, { Fragment, useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";

const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    openEditForm,
    cancelEditForm,
  } = activityStore;

  return (
    <Fragment>
      <Card fluid>
        <Image
          src={`../assets/categoryImages/${activity!.category}.jpg`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span>{activity!.date}</span>
          </Card.Meta>
          <Card.Description>{activity!.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
            <Button
              onClick={() => openEditForm(activity!.id)}
              basic
              color="blue"
              content="Edit"
            />
            <Button
              onClick={cancelEditForm}
              basic
              color="grey"
              content="Cancel"
            />
          </Button.Group>
        </Card.Content>
      </Card>
    </Fragment>
  );
};

export default observer(ActivityDetails);
