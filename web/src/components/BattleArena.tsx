import React, { useState } from 'react';
import { Card, Row, Col, Button, Select, Typography, Space, Divider, Alert, Modal } from 'antd';
import { ThunderboltOutlined, TrophyOutlined, SkullOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface Character {
  id: number;
  character_type: number;
  power: number;
  defense: number;
  name: string;
  image: string;
}

interface Player {
  address: string;
  characters: Character[];
}

interface BattleArenaProps {
  myCharacters: Character[];
  otherPlayers: Player[];
  onBattle: (opponentAddress: string, myCharIndex: number, opponentCharIndex: number) => void;
  loading: boolean;
}

const BattleArena: React.FC<BattleArenaProps> = ({
  myCharacters,
  otherPlayers,
  onBattle,
  loading
}) => {
  const [selectedMyChar, setSelectedMyChar] = useState<number | null>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);
  const [selectedOpponentChar, setSelectedOpponentChar] = useState<number | null>(null);
  const [battleModalVisible, setBattleModalVisible] = useState(false);

  const handleBattle = () => {
    if (selectedMyChar !== null && selectedOpponent && selectedOpponentChar !== null) {
      onBattle(selectedOpponent, selectedMyChar, selectedOpponentChar);
      setBattleModalVisible(false);
      // Reset selections
      setSelectedMyChar(null);
      setSelectedOpponent(null);
      setSelectedOpponentChar(null);
    }
  };

  const getCharacterTypeLabel = (type: number) => {
    const types = {
      1: '👽 Alien',
      2: '👨‍🚀 Astronaut',
      3: '🤖 Robot',
      4: '🔧 Cyborg',
      5: '🧬 Mutant',
      6: '🤖 Android',
      7: '🪖 Space Marine',
      8: '🧠 Psionic',
      9: '⚔️ Berserker',
      10: '🔮 Technomancer'
    };
    return types[type as keyof typeof types] || 'Unknown';
  };

  const canStartBattle = selectedMyChar !== null && selectedOpponent && selectedOpponentChar !== null;

  return (
    <div>
      <Title level={3}>⚔️ Battle Arena</Title>
      
      {myCharacters.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Title level={4}>No characters to battle with!</Title>
            <Text>Mint some characters first to enter the arena.</Text>
          </div>
        </Card>
      ) : (
        <>
          {/* My Characters Selection */}
          <Card title="🎯 Select Your Warrior" style={{ marginBottom: 16 }}>
            <Row gutter={[16, 16]}>
              {myCharacters.map((character, index) => (
                <Col xs={24} sm={12} md={8} key={character.id}>
                  <Card
                    hoverable
                    style={{
                      border: selectedMyChar === index ? '2px solid #1890ff' : '1px solid #d9d9d9',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedMyChar(index)}
                    cover={
                      <img 
                        alt={character.name} 
                        src={character.image}
                        style={{ height: 150, objectFit: 'cover' }}
                      />
                    }
                  >
                    <Card.Meta
                      title={character.name}
                      description={
                        <Space direction="vertical" size="small">
                          <Text type="secondary">{getCharacterTypeLabel(character.character_type)}</Text>
                          <Text>⚔️ Power: {character.power} | 🛡️ Defense: {character.defense}</Text>
                        </Space>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>

          {/* Opponent Selection */}
          <Card title="🎭 Select Your Opponent" style={{ marginBottom: 16 }}>
            {otherPlayers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <Text>No other players found. Invite friends to join the battle!</Text>
              </div>
            ) : (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {otherPlayers.map((player) => (
                  <Card key={player.address} size="small">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <Text strong>Player: {player.address}</Text>
                      <Button
                        type={selectedOpponent === player.address ? 'primary' : 'default'}
                        onClick={() => setSelectedOpponent(player.address)}
                      >
                        Select Player
                      </Button>
                    </div>
                    
                    {selectedOpponent === player.address && (
                      <Row gutter={[16, 16]}>
                        {player.characters.map((character, index) => (
                          <Col xs={24} sm={12} md={8} key={character.id}>
                            <Card
                              hoverable
                              style={{
                                border: selectedOpponentChar === index ? '2px solid #ff4d4f' : '1px solid #d9d9d9',
                                cursor: 'pointer'
                              }}
                              onClick={() => setSelectedOpponentChar(index)}
                              cover={
                                <img 
                                  alt={character.name} 
                                  src={character.image}
                                  style={{ height: 150, objectFit: 'cover' }}
                                />
                              }
                            >
                              <Card.Meta
                                title={character.name}
                                description={
                                  <Space direction="vertical" size="small">
                                    <Text type="secondary">{getCharacterTypeLabel(character.character_type)}</Text>
                                    <Text>⚔️ Power: {character.power} | 🛡️ Defense: {character.defense}</Text>
                                  </Space>
                                }
                              />
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Card>
                ))}
              </Space>
            )}
          </Card>

          {/* Battle Button */}
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Button
              type="primary"
              size="large"
              icon={<ThunderboltOutlined />}
              onClick={() => setBattleModalVisible(true)}
              disabled={!canStartBattle}
              loading={loading}
            >
              ⚔️ Start Battle
            </Button>
          </div>

          {/* Battle Confirmation Modal */}
          <Modal
            title="⚔️ Confirm Battle"
            open={battleModalVisible}
            onOk={handleBattle}
            onCancel={() => setBattleModalVisible(false)}
            okText="Fight!"
            cancelText="Cancel"
            confirmLoading={loading}
          >
            {selectedMyChar !== null && selectedOpponent && selectedOpponentChar !== null && (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Alert
                  message="Battle Rules"
                  description="The losing character will be burned (permanently destroyed). Are you sure you want to proceed?"
                  type="warning"
                  showIcon
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={myCharacters[selectedMyChar].image}
                      alt={myCharacters[selectedMyChar].name}
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                    />
                    <br />
                    <Text strong>{myCharacters[selectedMyChar].name}</Text>
                    <br />
                    <Text type="secondary">Power: {myCharacters[selectedMyChar].power} | Defense: {myCharacters[selectedMyChar].defense}</Text>
                  </div>
                  
                  <ThunderboltOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                  
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={otherPlayers.find(p => p.address === selectedOpponent)?.characters[selectedOpponentChar].image}
                      alt={otherPlayers.find(p => p.address === selectedOpponent)?.characters[selectedOpponentChar].name}
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                    />
                    <br />
                    <Text strong>{otherPlayers.find(p => p.address === selectedOpponent)?.characters[selectedOpponentChar].name}</Text>
                    <br />
                    <Text type="secondary">
                      Power: {otherPlayers.find(p => p.address === selectedOpponent)?.characters[selectedOpponentChar].power} | 
                      Defense: {otherPlayers.find(p => p.address === selectedOpponent)?.characters[selectedOpponentChar].defense}
                    </Text>
                  </div>
                </div>
              </Space>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default BattleArena;
