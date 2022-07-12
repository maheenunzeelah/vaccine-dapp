pragma solidity >=0.4.20;

contract Manufacturer{
    address public manufacturer;
     constructor() {
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
   
    modifier onlyDistributor () {
      require(isDistributor(), "Only registered distributor can perform this action");
      _;
    }
      function isDistributor() public view returns(bool){
        return (distributor[msg.sender]);
    }

}
contract VaccinationCenter is Distributor{
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
    // address public manufacturer;
    address public vaccination_center; // only authorized vaccination center is allowed
    // mapping(address => bool) public distributor; // only authorized distributors are allowed
    enum containerStatus {NotReady, ReadyforDelivery, StartDelivery, onTrack, EndDelivery, ContainerReceived, Violated}
    // containerStatus public state;
    uint startTime;
    enum violationType { None, Temp, Open, Light, Route}
    violationType public violation;
    int temperature; // temperature tracking
    int open;
    int track; // 1 if on track, 0 if not 
    int light;

        //Tracking Events
    event ContainerOwnership (address previousowner, address newowner); // Manufacturer announces container is created
    event ContainerReadyForDelivery(uint256 id, address indexed manufacturer); //Manufacturer announces container is ready for delivery
    event DeliveryStart(uint256 id, address indexed distributor); //Distributor announces that start of the delivery process
    event DeliveryEnd(uint256 id, address indexed distributor); // Distributor announces the end of the delivery
    event ContainerReception(uint256 id, address indexed vaccination_center); 
    
    //Violations Events
    event TemperatureViolation( int v); 
    event ContainerOpening( int v);
    event OffTrack( int v);
    event LightViolation ( int v);
    event ErrorNoValidViolation();

    struct Vaccines {
        uint id;
        string name;
        containerStatus state;
        violationType v;
    }
   mapping(uint=>Vaccines)public  vaccine;
   uint public vaccineCount;
   mapping(uint=> bool) public containersCreated;
 
    constructor() {
      manufacturer = msg.sender;
      startTime = block.timestamp;
      addVaccines("Pfizer");
      addVaccines("Sinovac");
    //   state = containerStatus.NotReady;
      emit ContainerOwnership(address(0), manufacturer);
    }
      function addVaccines(string memory _name) internal {
        vaccine[vaccineCount] = Vaccines(
            vaccineCount,
            _name,
            containerStatus.NotReady,
            violationType.None
        );
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

        emit ContainerReadyForDelivery(vacc_id, msg.sender);

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
        emit DeliveryStart(vacc_id, msg.sender);
        
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
        emit DeliveryEnd(vacc_id, msg.sender);
        // return vaccine[vacc_id].state;
    }
   
     function ReceiveContainer(uint vacc_id) public onlyVaccinationCenter
    {
        require(
            vaccine[vacc_id].state == containerStatus.EndDelivery,
            "Can't receive the container before announcing the end of it"
        );
        vaccine[vacc_id].state = containerStatus.ContainerReceived;
        emit ContainerReception(vacc_id, msg.sender);
        
    }
   
    //Violations Monitoring 
    
    function violationOccurrence(violationType v, int value, uint vacc_id) public onlyContainer{
        require(vaccine[vacc_id].state  == containerStatus.onTrack, "The container is not being delivered"); // Monitoring starts when the container is on track
        
        vaccine[vacc_id].state = containerStatus.Violated;
        if(v == violationType.Temp){
             
            emit TemperatureViolation( value);
        }
        else if (v == violationType.Open){
            //either 1 or 0
            emit ContainerOpening ( value);
        }
        else if (v == violationType.Route){
           
            emit OffTrack(  value);
        }
        else if (v == violationType.Light){
           
            emit LightViolation( value);
        }
        else
            emit ErrorNoValidViolation();
    }
}
