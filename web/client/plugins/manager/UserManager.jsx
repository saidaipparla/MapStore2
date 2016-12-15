/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {connect} = require('react-redux');
const {Button, Grid, Glyphicon} = require('react-bootstrap');
const {editUser} = require('../../actions/users');
const {setControlProperty} = require('../../actions/controls');
const SearchBar = require('./users/SearchBar');
const UserGrid = require('./users/UserGrid');
const UserDialog = require('./users/UserDialog');
const UserDeleteConfirm = require('./users/UserDeleteConfirm');
const Message = require('../../components/I18N/Message');
const assign = require('object-assign');

const UserManager = React.createClass({
    propTypes: {
        selectedTool: React.PropTypes.string,
        selectedGroup: React.PropTypes.string,
        onNewUser: React.PropTypes.func,
        onToggleUsersGroups: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            selectedGroup: "users",
            onNewUser: () => {},
            onToggleUsersGroups: () => {}
        };
    },
    onNew() {
        this.props.onNewUser();
    },
    render() {
        return (<div>
                <SearchBar />
                {this.toogleTools()}
                <Grid style={{marginBottom: "10px"}} fluid={true}>
                    <h1 className="usermanager-title"><Message msgId={"users.users"}/></h1>
                    <Button style={{marginRight: "10px"}} bsStyle="success" onClick={this.onNew}><span><Glyphicon glyph="1-user-add" /><Message msgId="users.newUser" /></span></Button>
                </Grid>
                <UserGrid />
                <UserDialog />
                <UserDeleteConfirm />
        </div>);
    },
    toogleTools() {
        this.props.onToggleUsersGroups(this.props.selectedGroup);
    }
});
module.exports = {
    UserManagerPlugin: assign(
        connect((state) => ({
            selectedTool: state && state.controls && state.controls.managerchoice && state.controls.managerchoice.selectedTool
        }), {
            onNewUser: editUser.bind(null, {role: "USER", "enabled": true}),
            onToggleUsersGroups: setControlProperty.bind(null, "managerchoice", "selectedTool")
        })(UserManager), {
    hide: true,
    Manager: {
        id: "usermanager",
        name: 'usermanager',
        position: 1,
        title: <Message msgId="users.manageUsers" />,
        glyph: "1-user-mod"
    }}),
    reducers: {
        users: require('../../reducers/users'),
        usergroups: require('../../reducers/usergroups'),
        controls: require('../../reducers/controls')
    }
};
