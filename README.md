For learning, I have developed an Ethereum Dapp based on “Blockchain-Based Solution for Distribution and Delivery of COVID-19 Vaccines” research paper written by by Ahmad Musamih, Raja Jayaraman, Khaled Salah, Haya R Hasan, Ibrar Yaqoob, Yousof Al-Hammadi.
They also provided smart contract, written in solidity, for public use, so I changed it a little bit and used it for developing Dapp.


Overview:
-  There are four roles, manufacturer, distributor, container and vaccination center. Roles' permissions are managed by solidity modifiers
![1](https://user-images.githubusercontent.com/46377344/180748848-4e27d8ca-dd8a-48c8-8786-7d39cce9d2b6.png)

-  Manufacturer can create containers and add distributor.
![2](https://user-images.githubusercontent.com/46377344/180749062-d9da40e5-9a40-4c6f-8fcf-3a4da768ecd5.png)
![3](https://user-images.githubusercontent.com/46377344/180749239-4a84c4eb-b1bd-4549-acff-ab9be540ed34.png)
![4](https://user-images.githubusercontent.com/46377344/180749247-183f3815-1388-4568-a5c2-b3a3213edde0.png)
![5](https://user-images.githubusercontent.com/46377344/180749255-bb82f716-735d-4808-8147-3cb62da05d84.png)

-  Distributor can start and end delivery of containers.
![6](https://user-images.githubusercontent.com/46377344/180749261-b239fde2-52a8-4998-a844-331070acd7f4.png)
![7](https://user-images.githubusercontent.com/46377344/180749264-caa5969c-2daa-43d1-8412-5fced46c4ae5.png)
![8](https://user-images.githubusercontent.com/46377344/180749265-22595dca-2b77-40f2-9602-64a5ed1de24d.png)

-  Container can call violation events like rise in temperature, exposure to light etc.
![9](https://user-images.githubusercontent.com/46377344/180749272-d3594c1c-ad1d-43bd-b0ed-839869c1e0c6.png)

-  Vaccination center can receive containers.
-  Based on these transactions events will be triggered. Anyone can track the current status of the container.
![10](https://user-images.githubusercontent.com/46377344/180749275-acc0a9ab-46b2-4c0e-8a22-3f7e900729e4.png)
![11](https://user-images.githubusercontent.com/46377344/180749280-73ff844e-a2f0-4917-8595-51f26ec339fa.png)
![12](https://user-images.githubusercontent.com/46377344/180749287-d4e9b30c-4682-4626-aade-b3a2116f5ab5.png)
Features I added:
-  In original contract only one vaccine container could be tracked but I added option to track multiple containers.
![13](https://user-images.githubusercontent.com/46377344/180749288-efc11841-1583-4cb5-a5ea-42d86990a086.png)
![14](https://user-images.githubusercontent.com/46377344/180749293-a04186f7-530c-44e2-9035-88eae4cafe2d.png)
![15](https://user-images.githubusercontent.com/46377344/180749296-b21dce58-1d35-4188-a011-ad5c7a917c5c.png)
-  Restructured code and divided it into multiple contracts.
-  Tweaked vaccine container events and violation events.

For development:
-  Ganache is used as local blockchain.
-   Dapp is create by truffle react box.
-   Metamask wallet is used for account and private keys.
-   React Material UI for user interface.

Github link for original smart contract:
https://lnkd.in/dRNP8_uc
Research paper can be found on IEEE Xplore.


