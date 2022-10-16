import React, { Component } from "react";
import { connect } from "react-redux";
import {
    deleteUsers, getAllUsers
} from '../../redux/actions'

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { withRouter } from "react-router";

export class UserAdmin extends Component {

    componentDidMount() {
        this.props.getAllUsers();
    }

    handleButtonClick(Link) {
        console.log(Link)
        this.props.history.push(Link)
    }

    render() {

        console.log(this.props.allUsers);

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'email', headerName: 'Email', width: 130 },
            { field: 'username', headerName: 'UserName', width: 130 },
            { field: 'name', headerName: 'Name', width: 130 },
            { field: 'lastName', headerName: 'Last name', width: 130 },
            { field: 'phone', headerName: 'Phone', width: 130 },
            { field: 'typeUser', type: 'singleSelect',
            valueOptions: ['Admin', 'User', 'Banned'] ,
            editable:true,},
            {
                field: 'action',
                headerName: 'Edit/Details',
                sortable: false,
                width: 110,
                renderCell: (params) => {
                    const onClick = (e) => {
                        e.stopPropagation(); // don't select this row after clicking
                        this.props.history.push(`/userAdminDetail/${params.row.id}`);
                    };
                    return <button onClick={onClick}>More Details</button>;
                },
            },
        ];

        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={this.props.allUsers}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                // checkboxSelection
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allUsers: state.allUsers
    }
}

function mapDispatchToProps(dispatch) {
    //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
    return {
        deleteUsers: () => dispatch(deleteUsers()),
        getAllUsers: () => dispatch(getAllUsers()),
    }
}

const UserAdminRouter = withRouter(UserAdmin);

export default connect(mapStateToProps, mapDispatchToProps)(UserAdminRouter);



