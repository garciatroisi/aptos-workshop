import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Select, Input, Statistic, Space, Typography, Spin } from 'antd';
import { PlusOutlined, FireOutlined, ShieldOutlined } from '@ant-design/icons';

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

interface CharacterCollectionProps {
  characters: Character[];
  loading: boolean;
  onMintCharacter: () => void;
}

const CharacterCollection: React.FC<CharacterCollectionProps> = ({
  characters,
  loading,
  onMintCharacter
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [minting, setMinting] = useState(false);
  const [characterType, setCharacterType] = useState<number>(1);
  const [characterName, setCharacterName] = useState('');
  const [characterDescription, setCharacterDescription] = useState('');

  const characterTypes = [
    { value: 1, label: '👽 Alien', power: 85, defense: 70 },
    { value: 2, label: '👨‍🚀 Astronaut', power: 70, defense: 85 },
    { value: 3, label: '🤖 Robot', power: 80, defense: 80 }
  ];

  const handleMint = async () => {
    if (!characterName.trim()) return;
    
    setMinting(true);
    try {
      // This would call the Move mint_character function
      console.log('Minting character:', {
        characterType,
        name: characterName,
        description: characterDescription
      });
      
      // Simulate minting
      setTimeout(() => {
        onMintCharacter();
        setIsModalVisible(false);
        setMinting(false);
        setCharacterName('');
        setCharacterDescription('');
      }, 2000);
      
    } catch (error) {
      console.error('Minting failed:', error);
      setMinting(false);
    }
  };

  const getCharacterTypeLabel = (type: number) => {
    const charType = characterTypes.find(t => t.value === type);
    return charType ? charType.label : 'Unknown';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={3}>🎭 Your Character Collection</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          loading={loading}
        >
          Mint New Character
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" />
          <Text>Loading your warriors...</Text>
        </div>
      ) : characters.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Title level={4}>No characters yet!</Title>
            <Text>Mint your first character to start your galactic journey.</Text>
            <br />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
              style={{ marginTop: 16 }}
            >
              Mint Your First Character
            </Button>
          </div>
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {characters.map((character, index) => (
            <Col xs={24} sm={12} md={8} key={character.id}>
              <Card
                hoverable
                cover={
                  <img 
                    alt={character.name} 
                    src={character.image}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
                actions={[
                  <Text key="power">
                    <FireOutlined /> {character.power}
                  </Text>,
                  <Text key="defense">
                    <ShieldOutlined /> {character.defense}
                  </Text>
                ]}
              >
                <Card.Meta
                  title={character.name}
                  description={
                    <Space direction="vertical" size="small">
                      <Text type="secondary">{getCharacterTypeLabel(character.character_type)}</Text>
                      <Space>
                        <Statistic 
                          title="Power" 
                          value={character.power} 
                          prefix={<FireOutlined />}
                          valueStyle={{ fontSize: '14px' }}
                        />
                        <Statistic 
                          title="Defense" 
                          value={character.defense} 
                          prefix={<ShieldOutlined />}
                          valueStyle={{ fontSize: '14px' }}
                        />
                      </Space>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title="Mint New Character"
        open={isModalVisible}
        onOk={handleMint}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={minting}
        okText="Mint Character"
        cancelText="Cancel"
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>Character Type:</Text>
            <Select
              style={{ width: '100%', marginTop: 8 }}
              value={characterType}
              onChange={setCharacterType}
            >
              {characterTypes.map(type => (
                <Option key={type.value} value={type.value}>
                  {type.label} (Power: {type.power}, Defense: {type.defense})
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <Text strong>Character Name:</Text>
            <Input
              placeholder="Enter character name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              style={{ marginTop: 8 }}
            />
          </div>

          <div>
            <Text strong>Description:</Text>
            <Input.TextArea
              placeholder="Enter character description"
              value={characterDescription}
              onChange={(e) => setCharacterDescription(e.target.value)}
              rows={3}
              style={{ marginTop: 8 }}
            />
          </div>
        </Space>
      </Modal>
    </div>
  );
};

export default CharacterCollection;
