import React, {Component} from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  FormGroup,
  Input,
  Button,
  UncontrolledTooltip
} from "reactstrap";

export class Operator extends Component {
  constructor(props) {
    super(props);
    this.state = {operators:[]}
  }
  componentDidMount(){
    this.refreshList();
  }
  refreshList(){
    fetch(process.env.REACT_APP_API+'operator/GetAllOperator')
    .then(response=> response.json())
    .then(data=> {this.setState({operators:data});
  });
}

 
  render() {
    const {operators}=this.state;
    return(
      <>
      <div className="content">
        <Row>
      <Col lg="12" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Yeni Ekle
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Sil
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <thead className="text-primary">
                    <tr>
                      <th>Sil</th>
                      <th>Operatör Adı</th>
                      <th></th>
                    </tr>
                  </thead>
                    <tbody>      
                    {operators.map(op=>
                      <tr key={op.OperatorId}>
                        <td>
                        <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                          </td>
                        <td>{op.OperatorName}</td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title="Düzenle"
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Düzenle
                          </UncontrolledTooltip>
                        </td>
                      </tr>)}


              </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
    
 </Row>
      </div>
    </>
    )
  }
}