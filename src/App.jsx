import './App.css'
import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Backdrop from '@mui/material/Backdrop'
// import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
}

function App() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [account, setAccount] = useState(null)

  const isMobileDevice = () => {
    // return 'ontouchstart' in window || 'onmsgesturechange' in window
    return true
  }

  const handleConnectMetaMask = async () => {
    let { ethereum } = window
    console.log(ethereum)
    if (!isMobileDevice()) {
      alert('Desktop')
      if (ethereum && ethereum.isMetaMask) {
        if (ethereum.chainId === '0x4') {

          let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
          console.log(accounts)
          setAccount(accounts[0])
          setOpen(false)
        }
        else {
          alert('Please Switch your Network to Rinkeby testnet')
        }
      }
    }
    else{
      alert('Mobile')
    }
  }

  // detect when chain changed 
  window.ethereum.on('chainChanged', handleChainChanged)
  function handleChainChanged(_chainId) {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload()
  }

  return (
    // <div className="App">
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <div className="modelContainer">
            <Button className="modelBtn" onClick={handleOpen}>
              Connect Wallet
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    style={{ textAlign: 'center' }}
                  >
                    Connect Your Wallet
                  </Typography>
                  <div className="connectBtns">
                    <Button
                      className="cnnctBtn"
                      onClick={handleConnectMetaMask}
                    >
                      Connect With MetaMask
                    </Button>
                    <Button className="cnnctBtn" onClick={handleOpen}>
                      Connect With Wallet Connect
                    </Button>
                  </div>
                </Box>
              </Fade>
            </Modal>
          </div>
          <div className="contents">
            {account ? <p className="addrs"> {account}</p> : null}
          </div>
        </Box>
      </Container>
    </React.Fragment>
    // </div>
  )
}

export default App
