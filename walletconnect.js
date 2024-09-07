// walletconnect.js
async function connectMetaMask() {
    // Check if MetaMask is available in the browser
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access from MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Use ethers.js to create a provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Get the connected account address
            const address = await signer.getAddress();

            // Display the connected wallet address in the UI
            document.getElementById('connectedWallet').innerText = `Connected: ${address}`;

            // Log the connected address for debugging
            console.log(`Connected wallet address: ${address}`);
        } catch (error) {
            console.error('MetaMask connection failed:', error);
            if (error.code === 4001) { // User rejected the connection
                alert('MetaMask connection rejected by the user.');
            } else {
                alert('An error occurred during MetaMask connection.');
            }
        }
    } else {
        // MetaMask is not installed
        alert('MetaMask is not installed. Please install MetaMask to use this app.');
        window.open('https://metamask.io/download.html', '_blank');
    }
}

// Add the event listener for the connect button when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('connectButton').addEventListener('click', connectMetaMask);
});
