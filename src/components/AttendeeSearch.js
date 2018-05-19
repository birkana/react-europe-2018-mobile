import React from 'react';
import ContactCard from './ContactCard';
import { View, TextInput, FlatList, ScrollView } from 'react-native';

export default class AttendeeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      attendees: []
    };
  }

  handleChange(value) {
    if (value && value.length > 2) {
      this.search(value);
    }
  }

  search(query) {
    let q = `{
        events(slug: "reacteurope-2018") {
             attendees(q:"${query}", uuid:"f35ad898-fe07-49cc-bd55-c4fbb59ac1b7") {
              id
              lastName
              email
              firstName
              answers {
                id
                value
                question {
                  id
                  title
                }
              }
            }
        }
      }
    `;
    let that = this;
    fetch('http://www.react-europe.org/gql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q })
    })
      .then((res) => res.json())
      .then((res) => {
        that.setState({ attendees: res.data.events[0].attendees });
      });
  }

  _renderItem(item) {
    const contact = item.item;
    return (
      <ContactCard
        key={contact.id + contact.email}
        contact={contact}
        tickets={{}}
        style={{ marginTop: 10, marginBottom: 10 }}
      />
    );
  }

  render() {
    const { attendees } = this.state;
    return (
      <View style={[{ marginHorizontal: 10 }, this.props.style]}>
        <TextInput
          onChangeText={this.handleChange}
          style={{
            height: 40,
            borderWidth: 2,
            borderColor: '#eee',
            marginTop: 5
          }}
        />

        <FlatList
          renderScrollComponent={(props) => <ScrollView {...props} />}
          renderItem={this._renderItem}
          data={attendees}
          keyExtractor={(item) => `${item.id}`}
          initialNumToRender={10}
          keyboardDismissMode="on-drag"
        />
      </View>
    );
  }
}
