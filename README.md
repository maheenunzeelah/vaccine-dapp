For learning, I have developed an Ethereum Dapp based on “Blockchain-Based Solution for Distribution and Delivery of COVID-19 Vaccines” research paper written by by Ahmad Musamih, Raja Jayaraman, Khaled Salah, Haya R Hasan, Ibrar Yaqoob, Yousof Al-Hammadi.
They also provided smart contract, written in solidity, for public use, so I changed it a little bit and used it for developing Dapp.

Overview:
-  There are four roles, manufacturer, distributor, container and vaccination center. Roles' permissions are managed by solidity modifiers.
-  Manufacturer can create containers and add distributor.
-  Distributor can start and end delivery of containers.
-  Container can call violation events like rise in temperature, exposure to light etc.
-   Vaccination center can receive containers.
-   Based on these transactions events will be triggered. Anyone can track the current status of the container.

Features I added:
-  In original contract only one vaccine container could be tracked but I added option to track multiple containers.
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
