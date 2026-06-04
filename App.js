import React, { useMemo, useState } from 'react';

import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  Appbar,
  Badge,
  Button,
  Card,
  Chip,
  Divider,
  FAB,
  IconButton,
  MD3LightTheme,
  ProgressBar,
  Provider as PaperProvider,
  Searchbar,
  Snackbar,
  Surface,
  Text,
} from 'react-native-paper';

import materialTheme from './material-theme.json';

const larguraTela = Dimensions.get('window').width;
const larguraPlantao = Math.min(larguraTela * 0.78, 332);

const cores = materialTheme.schemes.light;

const tema = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: cores.primary,
    onPrimary: cores.onPrimary,
    primaryContainer: cores.primaryContainer,
    onPrimaryContainer: cores.onPrimaryContainer,
    secondary: cores.secondary,
    onSecondary: cores.onSecondary,
    secondaryContainer: cores.secondaryContainer,
    onSecondaryContainer: cores.onSecondaryContainer,
    tertiary: cores.tertiary,
    onTertiary: cores.onTertiary,
    tertiaryContainer: cores.tertiaryContainer,
    onTertiaryContainer: cores.onTertiaryContainer,
    error: cores.error,
    onError: cores.onError,
    errorContainer: cores.errorContainer,
    onErrorContainer: cores.onErrorContainer,
    background: cores.background,
    onBackground: cores.onBackground,
    surface: cores.surface,
    onSurface: cores.onSurface,
    surfaceVariant: cores.surfaceVariant,
    onSurfaceVariant: cores.onSurfaceVariant,
    outline: cores.outline,
    outlineVariant: cores.outlineVariant,
    surfaceContainer: cores.surfaceContainer,
    surfaceContainerHigh: cores.surfaceContainerHigh,
    surfaceContainerHighest: cores.surfaceContainerHighest,
  },
};

const categorias = ['Todos', 'Eletrica', 'Hidraulica', 'Limpeza', 'Seguranca'];

const indicadores = [
  { id: 'i1', rotulo: 'Hoje', valor: '6', apoio: 'janelas livres' },
  { id: 'i2', rotulo: 'SLA medio', valor: '2h', apoio: 'resposta inicial' },
  { id: 'i3', rotulo: 'Nota', valor: '4.8', apoio: 'prestadores' },
];

const plantoes = [
  {
    id: 'p1',
    titulo: 'Vazamento urgente',
    descricao: 'Equipe hidraulica disponivel ate 22h para reparos rapidos.',
    etiqueta: '24h',
    icone: 'water-alert',
    cor: cores.tertiaryContainer,
    texto: cores.onTertiaryContainer,
  },
  {
    id: 'p2',
    titulo: 'Revisao preventiva',
    descricao: 'Checklist eletrico, tomadas, disjuntores e pontos de risco.',
    etiqueta: 'Checkup',
    icone: 'clipboard-check-outline',
    cor: cores.primaryContainer,
    texto: cores.onPrimaryContainer,
  },
  {
    id: 'p3',
    titulo: 'Limpeza pos-obra',
    descricao: 'Pacote com produtos, descarte leve e vistoria final.',
    etiqueta: 'Pacote',
    icone: 'spray-bottle',
    cor: cores.secondaryContainer,
    texto: cores.onSecondaryContainer,
  },
];

const servicos = [
  {
    id: 's1',
    nome: 'Troca de chuveiro',
    categoria: 'Eletrica',
    preco: 'R$ 120',
    prazo: 'Hoje, 18:30',
    descricao: 'Instalacao segura com teste de aquecimento e vedacao.',
    nota: '4.9',
    urgencia: 0.92,
    icone: 'shower',
    cor: cores.primaryContainer,
    texto: cores.onPrimaryContainer,
  },
  {
    id: 's2',
    nome: 'Reparo em sifao',
    categoria: 'Hidraulica',
    preco: 'R$ 95',
    prazo: 'Amanha, 09:00',
    descricao: 'Diagnostico de gotejamento, troca de anel e limpeza da peca.',
    nota: '4.8',
    urgencia: 0.74,
    icone: 'wrench',
    cor: cores.tertiaryContainer,
    texto: cores.onTertiaryContainer,
  },
  {
    id: 's3',
    nome: 'Higienizacao de sofa',
    categoria: 'Limpeza',
    preco: 'R$ 180',
    prazo: 'Sexta, 14:00',
    descricao: 'Lavagem extratora para tecido, almofadas e bracos.',
    nota: '4.7',
    urgencia: 0.51,
    icone: 'sofa',
    cor: cores.secondaryContainer,
    texto: cores.onSecondaryContainer,
  },
  {
    id: 's4',
    nome: 'Fechadura digital',
    categoria: 'Seguranca',
    preco: 'R$ 260',
    prazo: 'Sabado, 10:30',
    descricao: 'Instalacao, cadastro de senhas e orientacao de uso.',
    nota: '4.9',
    urgencia: 0.67,
    icone: 'lock-outline',
    cor: cores.surfaceContainerHighest,
    texto: cores.onSurface,
  },
  {
    id: 's5',
    nome: 'Limpeza de caixa d agua',
    categoria: 'Limpeza',
    preco: 'R$ 210',
    prazo: 'Segunda, 08:00',
    descricao: 'Esvaziamento, escovacao interna e laudo simples do servico.',
    nota: '4.6',
    urgencia: 0.46,
    icone: 'bucket',
    cor: cores.surfaceContainerHigh,
    texto: cores.onSurface,
  },
];

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [salvos, setSalvos] = useState([]);
  const [chamados, setChamados] = useState([]);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');

  const servicosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return servicos.filter((servico) => {
      const bateCategoria =
        categoriaAtiva === 'Todos' || servico.categoria === categoriaAtiva;
      const bateBusca =
        termo.length === 0 ||
        servico.nome.toLowerCase().includes(termo) ||
        servico.categoria.toLowerCase().includes(termo) ||
        servico.descricao.toLowerCase().includes(termo);

      return bateCategoria && bateBusca;
    });
  }, [busca, categoriaAtiva]);

  function mostrarFeedback(mensagem) {
    setSnackMsg(mensagem);
    setSnackVisible(true);
  }

  function selecionarCategoria(categoria) {
    setCategoriaAtiva(categoria);
    mostrarFeedback(`Filtro aplicado: ${categoria}`);
  }

  function alternarSalvo(servico) {
    const jaSalvo = salvos.includes(servico.id);
    setSalvos((atuais) =>
      jaSalvo ? atuais.filter((id) => id !== servico.id) : [...atuais, servico.id],
    );
    mostrarFeedback(
      jaSalvo
        ? `${servico.nome} removido da lista`
        : `${servico.nome} salvo para comparar`,
    );
  }

  function abrirChamado(servico) {
    setChamados((atuais) => [...atuais, servico.id]);
    mostrarFeedback(`${servico.nome} adicionado aos chamados`);
  }

  return (
    <PaperProvider theme={tema}>
      <StatusBar backgroundColor={cores.primary} barStyle="light-content" />

      <View style={estilos.container}>
        <Appbar.Header elevated style={estilos.appBar}>
          <Appbar.Action
            icon="home-variant-outline"
            color={cores.onPrimary}
            onPress={() => mostrarFeedback('Painel residencial aberto')}
            accessibilityLabel="Abrir painel residencial"
          />
          <Appbar.Content
            title="Habita+"
            subtitle="Servicos para casa"
            titleStyle={estilos.appBarTitulo}
            subtitleStyle={estilos.appBarSubtitulo}
          />
          <View style={estilos.badgeArea}>
            {chamados.length > 0 && (
              <Badge style={estilos.badge}>{chamados.length}</Badge>
            )}
            <Appbar.Action
              icon="calendar-check-outline"
              color={cores.onPrimary}
              onPress={() =>
                mostrarFeedback(`${chamados.length} chamado(s) em planejamento`)
              }
              accessibilityLabel="Abrir agenda de chamados"
            />
          </View>
        </Appbar.Header>

        <ScrollView
          style={estilos.scroll}
          contentContainerStyle={estilos.scrollConteudo}
          showsVerticalScrollIndicator={false}
        >
          <Surface elevation={1} style={estilos.hero}>
            <View style={estilos.heroTexto}>
              <Text variant="headlineSmall" style={estilos.tituloPrincipal}>
                Resolva pendencias da casa
              </Text>
              <Text variant="bodyMedium" style={estilos.descricaoPrincipal}>
                Busque profissionais, compare horarios e monte uma agenda de atendimento.
              </Text>
            </View>

            <Searchbar
              value={busca}
              onChangeText={setBusca}
              placeholder="Buscar servico, area ou problema"
              iconColor={cores.primary}
              style={estilos.busca}
              inputStyle={estilos.buscaTexto}
              onSubmitEditing={() => mostrarFeedback('Busca atualizada')}
              accessibilityLabel="Buscar servicos residenciais"
            />

            <View style={estilos.indicadores}>
              {indicadores.map((indicador) => (
                <Surface key={indicador.id} elevation={0} style={estilos.indicador}>
                  <Text variant="labelMedium" style={estilos.indicadorRotulo}>
                    {indicador.rotulo}
                  </Text>
                  <Text variant="titleLarge" style={estilos.indicadorValor}>
                    {indicador.valor}
                  </Text>
                  <Text variant="labelSmall" style={estilos.indicadorApoio}>
                    {indicador.apoio}
                  </Text>
                </Surface>
              ))}
            </View>
          </Surface>

          <FlatList
            data={categorias}
            horizontal
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={estilos.categorias}
            renderItem={({ item }) => (
              <Chip
                selected={categoriaAtiva === item}
                mode={categoriaAtiva === item ? 'flat' : 'outlined'}
                icon={categoriaAtiva === item ? 'check' : 'shape-outline'}
                onPress={() => selecionarCategoria(item)}
                style={estilos.chip}
                textStyle={estilos.chipTexto}
                accessibilityLabel={`Filtrar servicos de ${item}`}
              >
                {item}
              </Chip>
            )}
          />

          <Text variant="titleLarge" style={estilos.secaoTitulo}>
            Plantoes e pacotes
          </Text>
          <FlatList
            data={plantoes}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={estilos.plantoes}
            renderItem={({ item }) => (
              <Card
                mode="elevated"
                elevation={2}
                style={[estilos.plantaoCard, { backgroundColor: item.cor }]}
                onPress={() => mostrarFeedback(item.titulo)}
                accessibilityLabel={`Abrir detalhes de ${item.titulo}`}
              >
                <Card.Content>
                  <View style={estilos.plantaoTopo}>
                    <Text variant="labelLarge" style={[estilos.etiqueta, { color: item.texto }]}>
                      {item.etiqueta}
                    </Text>
                    <IconButton
                      icon={item.icone}
                      size={28}
                      iconColor={item.texto}
                      style={estilos.iconeSemMargem}
                      onPress={() => mostrarFeedback(item.titulo)}
                      accessibilityLabel={`Ver pacote ${item.titulo}`}
                    />
                  </View>
                  <Text variant="titleMedium" style={[estilos.plantaoTitulo, { color: item.texto }]}>
                    {item.titulo}
                  </Text>
                  <Text variant="bodyMedium" style={{ color: item.texto }}>
                    {item.descricao}
                  </Text>
                </Card.Content>
              </Card>
            )}
          />

          <Divider style={estilos.divisor} />

          <View style={estilos.secaoCabecalho}>
            <View>
              <Text variant="titleLarge" style={estilos.secaoTituloSemMargem}>
                Servicos disponiveis
              </Text>
              <Text variant="labelMedium" style={estilos.secaoSubtitulo}>
                {servicosFiltrados.length} opcao(oes) encontradas
              </Text>
            </View>
            <IconButton
              icon="sort-clock-ascending-outline"
              size={24}
              iconColor={cores.primary}
              onPress={() => mostrarFeedback('Ordenacao por horario sugerida')}
              accessibilityLabel="Ordenar servicos por horario"
            />
          </View>

          {servicosFiltrados.map((servico) => {
            const salvo = salvos.includes(servico.id);

            return (
              <Card key={servico.id} mode="elevated" elevation={1} style={estilos.servicoCard}>
                <Card.Content style={estilos.servicoConteudo}>
                  <Surface
                    elevation={0}
                    style={[estilos.iconeArea, { backgroundColor: servico.cor }]}
                  >
                    <IconButton
                      icon={servico.icone}
                      size={36}
                      iconColor={servico.texto}
                      onPress={() => mostrarFeedback(`Resumo de ${servico.nome}`)}
                      accessibilityLabel={`Visualizar icone do servico ${servico.nome}`}
                    />
                  </Surface>

                  <View style={estilos.servicoInfo}>
                    <View style={estilos.servicoTopo}>
                      <View style={estilos.servicoTituloArea}>
                        <Text variant="titleMedium" style={estilos.servicoNome}>
                          {servico.nome}
                        </Text>
                        <Text variant="labelMedium" style={estilos.servicoCategoria}>
                          {servico.categoria} · {servico.prazo}
                        </Text>
                      </View>
                      <IconButton
                        icon={salvo ? 'bookmark' : 'bookmark-outline'}
                        size={22}
                        iconColor={salvo ? cores.tertiary : cores.onSurfaceVariant}
                        onPress={() => alternarSalvo(servico)}
                        accessibilityLabel={
                          salvo
                            ? `Remover ${servico.nome} dos servicos salvos`
                            : `Salvar ${servico.nome} para comparar`
                        }
                      />
                    </View>

                    <Text variant="bodyMedium" style={estilos.servicoDescricao}>
                      {servico.descricao}
                    </Text>

                    <View style={estilos.urgenciaLinha}>
                      <Text variant="labelMedium" style={estilos.urgenciaTexto}>
                        Prioridade da agenda
                      </Text>
                      <Text variant="labelMedium" style={estilos.nota}>
                        ★ {servico.nota}
                      </Text>
                    </View>
                    <ProgressBar
                      progress={servico.urgencia}
                      color={cores.primary}
                      style={estilos.progresso}
                      accessibilityLabel={`Prioridade ${Math.round(servico.urgencia * 100)} por cento`}
                    />

                    <View style={estilos.servicoRodape}>
                      <Text variant="titleMedium" style={estilos.preco}>
                        {servico.preco}
                      </Text>
                      <Button
                        mode="contained"
                        icon="plus-circle-outline"
                        compact
                        onPress={() => abrirChamado(servico)}
                        accessibilityLabel={`Abrir chamado para ${servico.nome}`}
                      >
                        Agendar
                      </Button>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            );
          })}
        </ScrollView>

        <FAB
          icon="map-marker-outline"
          label="Roteiro"
          style={estilos.fab}
          color={cores.onPrimary}
          onPress={() => mostrarFeedback('Roteiro de atendimentos criado')}
          accessibilityLabel="Criar roteiro de atendimentos"
        />

        <Snackbar
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
          duration={2600}
          style={estilos.snackbar}
          action={{
            label: 'OK',
            onPress: () => setSnackVisible(false),
          }}
        >
          {snackMsg}
        </Snackbar>
      </View>
    </PaperProvider>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
  },
  appBar: {
    backgroundColor: cores.primary,
  },
  appBarTitulo: {
    color: cores.onPrimary,
    fontWeight: '700',
  },
  appBarSubtitulo: {
    color: cores.onPrimary,
    opacity: 0.9,
  },
  badgeArea: {
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 2,
    backgroundColor: cores.tertiary,
    color: cores.onTertiary,
  },
  scroll: {
    flex: 1,
  },
  scrollConteudo: {
    paddingBottom: 112,
  },
  hero: {
    margin: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: cores.surfaceContainer,
    gap: 14,
  },
  heroTexto: {
    gap: 4,
  },
  tituloPrincipal: {
    color: cores.onSurface,
    fontWeight: '700',
  },
  descricaoPrincipal: {
    color: cores.onSurfaceVariant,
  },
  busca: {
    backgroundColor: cores.surface,
    borderRadius: 14,
  },
  buscaTexto: {
    color: cores.onSurface,
  },
  indicadores: {
    flexDirection: 'row',
    gap: 8,
  },
  indicador: {
    flex: 1,
    padding: 10,
    borderRadius: 14,
    backgroundColor: cores.surface,
  },
  indicadorRotulo: {
    color: cores.onSurfaceVariant,
  },
  indicadorValor: {
    color: cores.primary,
    fontWeight: '800',
  },
  indicadorApoio: {
    color: cores.onSurfaceVariant,
  },
  categorias: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  chip: {
    borderColor: cores.outline,
  },
  chipTexto: {
    color: cores.onSurface,
  },
  secaoTitulo: {
    color: cores.onSurface,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 10,
  },
  plantoes: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  plantaoCard: {
    width: larguraPlantao,
    borderRadius: 18,
  },
  plantaoTopo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  etiqueta: {
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  iconeSemMargem: {
    margin: 0,
  },
  plantaoTitulo: {
    fontWeight: '700',
    marginBottom: 4,
  },
  divisor: {
    backgroundColor: cores.outlineVariant,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  secaoCabecalho: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 10,
  },
  secaoTituloSemMargem: {
    color: cores.onSurface,
    fontWeight: '700',
  },
  secaoSubtitulo: {
    color: cores.onSurfaceVariant,
    marginTop: 2,
  },
  servicoCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: cores.surface,
  },
  servicoConteudo: {
    flexDirection: 'row',
    gap: 12,
  },
  iconeArea: {
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    width: 82,
  },
  servicoInfo: {
    flex: 1,
    gap: 8,
  },
  servicoTopo: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  servicoTituloArea: {
    flex: 1,
    paddingRight: 4,
  },
  servicoNome: {
    color: cores.onSurface,
    fontWeight: '700',
  },
  servicoCategoria: {
    color: cores.onSurfaceVariant,
    marginTop: 2,
  },
  servicoDescricao: {
    color: cores.onSurfaceVariant,
  },
  urgenciaLinha: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  urgenciaTexto: {
    color: cores.onSurfaceVariant,
  },
  nota: {
    color: cores.onSurfaceVariant,
  },
  progresso: {
    height: 7,
    borderRadius: 8,
    backgroundColor: cores.surfaceVariant,
  },
  servicoRodape: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  preco: {
    color: cores.primary,
    fontWeight: '800',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    backgroundColor: cores.primary,
  },
  snackbar: {
    backgroundColor: cores.inverseSurface,
    marginBottom: 88,
  },
});
