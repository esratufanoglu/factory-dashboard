import FDServices from 'FDServices';
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
  ButtonToolbar,
  UncontrolledTooltip,
  Modal, ModalHeader, ModalBody, ModalFooter,
  FormText
} from "reactstrap";

export class Machine extends Component {
  constructor(props) {
    super(props);
    this.state = {  machines:[], 
                    operators:[], 
                    shift:[], 
                    modal: false, 
                    machineId:'',
                    machineCode:'', 
                    machineName:'', 
                    machineTarget:'', 
                    operatorId:'', 
                    shiftId:'', 
                    isNotActive:'',
                    checkedMachines:[]}
    this.toggleModal = this.toggleModal.bind(this);
    this.saveOrUpdateMachine = this.saveOrUpdateMachine.bind(this);
    this.changeMachineCodeHandler = this.changeMachineCodeHandler.bind(this);
    this.changeMachineNameHandler = this.changeMachineNameHandler.bind(this);
    this.changeMachineTargetHandler = this.changeMachineTargetHandler.bind(this);
    this.changeOperatorHandler = this.changeOperatorHandler.bind(this);
    this.changeShiftHandler = this.changeShiftHandler.bind(this);
    this.checkboxDeleteHandler = this.checkboxDeleteHandler.bind(this);
    this.checkboxIsNotActiveHandler = this.checkboxIsNotActiveHandler.bind(this);
    this.deleteMachine = this.deleteMachine.bind(this);
    this.editMachine = this.editMachine.bind(this);
  }
  componentDidMount(){
      FDServices.getMachines().then((res) => {
          this.setState({ machines: res.data});
      });
      FDServices.getOperators().then((res) => {
        this.setState({ operators: res.data});
      }); 
      FDServices.getShift().then((res) => {
        this.setState({ shift: res.data});
      });
      this.setState({ checkedMachines: [], 
                      modal: false, 
                      machineId:0,
                      machineCode: '',
                      machineName: '',
                      machineTarget: '',
                      operatorId: '',
                      shiftId: '',
                      isNotActive: ''
                    });
  }
  componentDidUpdate(){
    FDServices.getMachines().then((res) => {
      this.setState({ machines: res.data});
  });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  saveOrUpdateMachine = (e) => {
    e.preventDefault();
    let machine = { MachineCode: this.state.machineCode, 
                    MachineName: this.state.machineName, 
                    MachineTarget: this.state.machineTarget, 
                    OperatorId: this.state.operatorId, 
                    ShiftId: this.state.shiftId,
                    IsNotActive: this.state.isNotActive==''?false:true};    
    if(this.state.machineId != 0) {
      FDServices.updateMachine(this.state.machineId, machine).then(res =>{
        this.toggleModal();
      });      
    }    
    else {
      console.log(machine);
      FDServices.createMachine(machine).then(res =>{
        this.toggleModal();
      });
    }
    this.setState({ machineId:0,
                    machineCode: '',
                    machineName: '',
                    machineTarget: '',
                    operatorId: '',
                    shiftId: '',
                    isNotActive: ''
    });
  }
  changeMachineCodeHandler= (event) => {
    this.setState({machineCode: event.target.value});
  }
  changeMachineNameHandler= (event) => {
    this.setState({machineName: event.target.value});
  }
  changeMachineTargetHandler= (event) => {
    this.setState({machineTarget: event.target.value});
  }
  changeOperatorHandler= (event) => {
    this.setState({operatorId: event.target.value});
  }
  changeShiftHandler= (event) => {
    this.setState({shiftId: event.target.value});
  }
  checkboxDeleteHandler=(event) =>{
    const selectedCheckboxes = this.state.checkedMachines;
    const findIdx = selectedCheckboxes.indexOf(event.target.value);

    if (findIdx > -1) {
      if(!event.target.checked)
        selectedCheckboxes.splice(findIdx, 1);
    } else {
      if(event.target.checked)
        selectedCheckboxes.push(event.target.value);
    }

    this.setState({
      checkedMachines: selectedCheckboxes
    });
  }
  checkboxIsNotActiveHandler=(event) =>{
    this.setState({isNotActive: event.target.checked});
  }
  deleteMachine=(event) =>{
    if(window.confirm('Seçtiğiniz makineleri silmek istediğinizden emin misiniz?')) {
      if(this.state.checkedMachines && this.state.checkedMachines.length>0) {
        this.state.checkedMachines.map(key=>{
          FDServices.deleteMachine(key);
        }); 
      }
    }
  }
  editMachine=id=>() => {
    FDServices.getMachineById(id).then((res) => {
      this.setState({ machineId: id,
                      machineCode: res.data.MachineCode, 
                      machineName: res.data.MachineName,
                      machineTarget: res.data.MachineTarget,
                      operatorId: res.data.OperatorId,
                      shiftId: res.data.ShiftId,
                      isNotActive: res.data.IsNotActive,
                      modal: true});
    });       
  }
  render() {
    const {machines, operators, shift}=this.state;
    return(
      <>
      <div className="content">
      <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
        
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        Makine Ekle
      </h5>
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-hidden="true"
        onClick={this.toggleModal}
      >
        <i className="tim-icons icon-simple-remove" />
      </button>
    </div>
    <ModalBody>
      <Card>
        <CardBody>
        <form>
          <FormGroup>
            <Label for="MachineCode">Makine Kodu</Label>
            <Input
              type="text"
              name="machineCode"
              placeholder="Makine Kodu" 
              maxLength={6} 
              value={this.state.machineCode}
              onChange={this.changeMachineCodeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="MachineName">Makine Adı</Label>
            <Input
              type="text"
              name="machineName"
              placeholder="Makine Adı"
              value={this.state.machineName}
              onChange={this.changeMachineNameHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="MachineTarget">Hedef</Label>
            <Input 
              type="text" 
              name="machineTarget" 
              placeholder="Hedef"
              value={this.state.machineTarget}
              onChange={this.changeMachineTargetHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Operator">Operatör</Label>
            <Input type="select" name="operatorId" value={this.state.operatorId} onChange={this.changeOperatorHandler}>
              <option key="0" value="">Seçiniz</option>
            {operators.map(op=>
              <option key={op.OperatorId} value={op.OperatorId}>{op.OperatorName}</option>)}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="Shift">Vardiya</Label>
            <Input type="select" name="shiftId" value={this.state.shiftId} onChange={this.changeShiftHandler}>
              <option key="0" value="">Seçiniz</option>
            {shift.map(sh=>
              <option key={sh.ShiftId} value={sh.ShiftId}>{sh.ShiftName}</option>)}
            </Input>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" defaultChecked={this.state.isNotActive} onChange={this.checkboxIsNotActiveHandler}/>{' '}
              Pasif
              <span className="form-check-sign">
                <span className="check"></span>
            </span>
            </Label>
          </FormGroup>
        </form>
   
        </CardBody>
      </Card>
         </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={this.toggleModal}>
            Kapat
        </Button>
        <Button color="primary" onClick={this.saveOrUpdateMachine}>
            Kaydet
        </Button>
    </ModalFooter>
</Modal>
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
                      href="#"
                      onClick={this.toggleModal}
                    >
                      Yeni Ekle
                    </DropdownItem>
                    <DropdownItem
                      href="#"
                      onClick={this.deleteMachine}
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
                      <th>Makine Kodu</th>
                      <th>Adı</th>
                      <th>Operatör</th>
                      <th>Vardiya</th>
                      <th>Hedef</th>
                      <th></th>
                    </tr>
                  </thead>
                    <tbody>      
                    {machines.map(mac=>
                      <tr key={mac.MachineId} className={mac.IsNotActive === true ? "NotActiveRow" : "" }>
                        <td>
                        <FormGroup check>
                            <Label check>
                              <Input type="checkbox" key={mac.MachineId} value={mac.MachineId} onChange={this.checkboxDeleteHandler}/>
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                          </td>
                        <td>{mac.MachineCode}</td>
                        <td>{mac.MachineName}</td>
                        <td>{mac.Operator.OperatorName}</td>
                        <td>{mac.Shift.ShiftName}</td>
                        <td>{mac.MachineTarget}</td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            title="Düzenle"
                            type="button"
                            onClick={this.editMachine(mac.MachineId)}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
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