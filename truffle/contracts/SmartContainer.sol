pragma solidity >=0.4.20;

contract Manufacturer{
    address public manufacturer;
     constructor() public {
        manufacturer=msg.sender;
    }
    modifier onlyManufacturer(){
        require(isManufacturer(),"Only manufacturer can perform this action");
        _;
    }
    function isManufacturer() public view returns(bool){
        return (msg.sender==manufacturer);
    }
     
}
contract Distributor is Manufacturer{
    mapping(address => bool) distributor; 
    //Authorization Function
     function distributorRegistration (address user) public onlyManufacturer { //manufacturer adds only authorized distributors
       distributor[user]=true;
    } 
    //  constructor(address _user) public {
    //     _distributor[msg.se]=_user;
    // }
    modifier onlyDistributor () {
      require(isDistributor(), "Only registered distributor can perform this action");
      _;
    }
      function isDistributor() public view returns(bool){
        return (distributor[msg.sender]);
    }

}
contract VaccinationCenter is Distributor{
    address public vaccination_center;
    
 modifier onlyVaccinationCenter() {
        require(isVaccinationCenter(),"Only Vaccination center can perform this action");
        _;
    }
     function isVaccinationCenter() public view returns(bool){
        return (!isManufacturer() && !isDistributor());
    }
}
contract Container is VaccinationCenter{
 modifier  onlyContainer() {
    require(isContainer(),"Only Container can perform this action");
        _;
    }
      function isContainer() public view returns(bool){
        return (!isManufacturer() && !isDistributor() );
    }
    
}
 contract SmartContainer is Container{
    address public container;
    enum containerStatus {NotReady, ReadyforDelivery, onTrack, EndDelivery, ContainerReceived, Violated}
    // containerStatus public state;
    uint startTime;
    enum violationType { None, Temp, Open, Light, Route}
    violationType public violation;
    int temperature; // temperature tracking
    int open;
    int track; // 1 if on track, 0 if not 
    int light;

        //Tracking Events
    event ContainerOwnership (uint id,address previousowner, address newowner); // Manufacturer announces container is created

     event VaccineChainStep(uint id, uint step, address indexed owner );
    //Violations Events
    event ViolationEvent(uint id, uint8 vio_type, int val);
  

    struct Vaccines {
        uint id;
        string name;
        containerStatus state;
        violationType v;
    }
   mapping(uint=>Vaccines) public  vaccine;
   uint public vaccineCount;
   mapping(uint=> bool) public containersCreated;
 
    constructor() public{
      manufacturer = msg.sender;
      startTime = block.timestamp;
      addVaccines("Pfizer");
      addVaccines("Sinovac Batch1");
      addVaccines("Sinovac Batch2");
      addVaccines("Sinovac Batch3");
      addVaccines("Sinovac Batch4");
      addVaccines("Sinovac Batch5");

    //   state = containerStatus.NotReady;
    }
      function addVaccines(string memory _name) internal {
        vaccine[vaccineCount] = Vaccines(
            vaccineCount,
            _name,
            containerStatus.NotReady,
            violationType.None
        );
      emit ContainerOwnership(vaccineCount,address(0), manufacturer);

        vaccineCount++;
    }
    // View Container manufacturer
    function containerManufacturer() public view returns (address){
        return manufacturer;
    }
    
    
    //Smart Container Tracking

   function CreateContainer(uint vacc_id) public onlyManufacturer {
        require(vaccine[vacc_id].state == containerStatus.NotReady && !containersCreated[vacc_id],
            "The smart container has already been created"
        );

        vaccine[vacc_id].state = containerStatus.ReadyforDelivery;

        emit VaccineChainStep(vacc_id,uint(vaccine[vacc_id].state),msg.sender);

        containersCreated[vacc_id] = true;
        // return vaccine[vacc_id].state;
    }
     
    
    function StartDelivery(uint vacc_id)
        public
        onlyDistributor
    {
        require(
            vaccine[vacc_id].state == containerStatus.ReadyforDelivery,
            "Can't start delivery before creating the container"
        );
        vaccine[vacc_id].state = containerStatus.onTrack;
        emit VaccineChainStep(vacc_id,uint(vaccine[vacc_id].state),msg.sender);

        
    }

    function EndDelivery(uint vacc_id)
        public
        onlyDistributor
    {
        require(
            vaccine[vacc_id].state == containerStatus.onTrack,
            "Can't end delivery before announcing the start of it"
        );
        vaccine[vacc_id].state = containerStatus.EndDelivery;
        emit VaccineChainStep(vacc_id,uint(vaccine[vacc_id].state),msg.sender);

    }
   
     function ReceiveContainer(uint vacc_id) public onlyVaccinationCenter
    {
        require(
            vaccine[vacc_id].state == containerStatus.EndDelivery,
            "Can't receive the container before announcing the end of it"
        );
        vaccine[vacc_id].state = containerStatus.ContainerReceived;
        emit VaccineChainStep(vacc_id,uint(vaccine[vacc_id].state),msg.sender);

        
    }
   
    //Violations Monitoring 
    
    function violationOccurrence(uint vacc_id, violationType v, int value) public onlyContainer{
        require(vaccine[vacc_id].state  == containerStatus.onTrack, "The container delivery hasn't been started yet"); // Monitoring starts when the container is on track
        
        vaccine[vacc_id].state = containerStatus.Violated;
        emit ViolationEvent(vacc_id,uint8(v),value);
 
}
 }