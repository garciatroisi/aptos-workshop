import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, Alert, Spin } from 'antd';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import { AptosClient } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import CharacterCollection from './components/CharacterCollection';
import BattleArena from './components/BattleArena';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

// Aptos client configuration
const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1');

// Module address - this should be updated after deployment
const MODULE_ADDRESS = '0x123...'; // Replace with actual deployed address

function App() {
  const { account, connected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [otherPlayers, setOtherPlayers] = useState<any[]>([]);

  useEffect(() => {
    if (connected && account) {
      loadCharacters();
      loadOtherPlayers();
    }
  }, [connected, account]);

  const loadCharacters = async () => {
    if (!account?.address) return;
    
    setLoading(true);
    try {
      // This would call the Move view function get_characters
      // For now, we'll simulate the data
      const mockCharacters = [
        {
          id: 1,
          character_type: 1,
          power: 85,
          defense: 70,
          name: "Cosmic Alien",
          image: "https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=Alien"
        },
        {
          id: 2,
          character_type: 2,
          power: 70,
          defense: 85,
          name: "Space Explorer",
          image: "https://via.placeholder.com/200x200/2196F3/FFFFFF?text=Astronaut"
        },
        {
          id: 3,
          character_type: 3,
          power: 80,
          defense: 80,
          name: "Battle Bot",
          image: "https://via.placeholder.com/200x200/FF9800/FFFFFF?text=Robot"
        }
      ];
      setCharacters(mockCharacters);
    } catch (err) {
      setError('Failed to load characters');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadOtherPlayers = async () => {
    // This would fetch other players' characters from the blockchain
    // For now, we'll simulate the data
    const mockOtherPlayers = [
      {
        address: '0x456...',
        characters: [
          {
            id: 4,
            character_type: 1,
            power: 90,
            defense: 65,
            name: "Dark Alien",
            image: "https://via.placeholder.com/200x200/9C27B0/FFFFFF?text=Dark+Alien"
          }
        ]
      }
    ];
    setOtherPlayers(mockOtherPlayers);
  };

  const handleBattle = async (opponentAddress: string, myCharIndex: number, opponentCharIndex: number) => {
    if (!account?.address) return;
    
    setLoading(true);
    try {
      // This would call the Move battle function
      console.log('Initiating battle:', {
        opponentAddress,
        myCharIndex,
        opponentCharIndex
      });
      
      // Simulate battle result
      setTimeout(() => {
        setError('Battle completed! Check the result.');
        loadCharacters(); // Reload to see updated characters
        setLoading(false);
      }, 2000);
      
    } catch (err) {
      setError('Battle failed');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
          <Title level={2} style={{ color: 'white', margin: 0 }}>
            🚀 Galactic Move Wars
          </Title>
          <WalletSelector />
        </Space>
      </Header>

      <Content className="app-content">
        {error && (
          <Alert
            message={error}
            type="info"
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: 16 }}
          />
        )}

        {!connected ? (
          <div className="welcome-section">
            <Title level={3}>Welcome to Galactic Move Wars!</Title>
            <p>Connect your wallet to start your intergalactic journey.</p>
            <p>Learn Move while battling with NFTs in this gamified workshop.</p>
          </div>
        ) : (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <CharacterCollection 
              characters={characters} 
              loading={loading}
              onMintCharacter={() => loadCharacters()}
            />
            
            <BattleArena 
              myCharacters={characters}
              otherPlayers={otherPlayers}
              onBattle={handleBattle}
              loading={loading}
            />
          </Space>
        )}
      </Content>

      <Footer className="app-footer">
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <p>Galactic Move Wars - A gamified Aptos Move workshop</p>
          <p>Built with ❤️ for the Aptos community</p>
        </Space>
      </Footer>
    </Layout>
  );
}

export default App;
