unit uApp;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ExtCtrls, mer, StdCtrls, Buttons, ToolWin, ActnMan, ActnCtrls,
  ActnMenus, ComCtrls, ActnList, XPStyleActnCtrls, Grids, ValEdit, Mask,
  uAux, Tabs, editSel, StdActns, Menus, Spin, Inspector, uFisico, uTemplate;

const appCaption = 'brModelo ';

type
  TbrFmPrincipal = class(TForm)
    Box: TScrollBox;
    ActionManager: TActionManager;
    arq_novo: TAction;
    arq_abrir: TAction;
    arq_fechar: TAction;
    Status: TStatusBar;
    arq_Salvar: TAction;
    ActionMainMenuBar1: TActionMainMenuBar;
    arq_salvarc: TAction;
    sis_sair: TAction;
    criar_Entidade: TAction;
    criar_relacionamento: TAction;
    criar_GerEsp: TAction;
    criar_multiRelacao: TAction;
    criar_texto: TAction;
    Juntador: TPanel;
    PaiScroller: TPanel;
    Opcoes: TPageControl;
    TabSheet1: TTabSheet;
    TabSheet2: TTabSheet;
    Splitter1: TSplitter;
    SavarDT: TAction;
    ReverterDT: TAction;
    Exibir_fonte: TAction;
    criar_Cancelar: TAction;
    Tool: TToolBar;
    ToolButton1: TToolButton;
    ToolButton2: TToolButton;
    ToolButton3: TToolButton;
    ToolButton4: TToolButton;
    ToolButton5: TToolButton;
    ToolButton6: TToolButton;
    criar_atributo: TAction;
    criar_ligacao: TAction;
    criar_altorelacionamento: TAction;
    del_base: TAction;
    Criar: TAction;
    Del: TAction;
    ToolButton7: TToolButton;
    ToolButton8: TToolButton;
    ToolButton9: TToolButton;
    ToolButton10: TToolButton;
    ToolButton11: TToolButton;
    ToolButton12: TToolButton;
    ToolButton13: TToolButton;
    Criar_espA: TAction;
    Criar_espB: TAction;
    promo_ea: TAction;
    promo_entidade: TAction;
    ToolBar4: TToolBar;
    TreeAtt: TTreeView;
    ao_Novo: TToolButton;
    ao_Excluir: TToolButton;
    ao_Editar: TToolButton;
    ToolButton17: TToolButton;
    ToolBar5: TToolBar;
    ao_exibir: TToolButton;
    ao_Ocultar: TAction;
    ac_orgAtt: TAction;
    Imprimir: TAction;
    edt_copy: TAction;
    edt_paste: TAction;
    edt_cut: TAction;
    mod_exibirHint: TAction;
    pb: TPanel;
    ToolBar3: TToolBar;
    ToolButton14: TToolButton;
    ToolButton15: TToolButton;
    MenuModelos: TPopupMenu;
    MenuObjetos: TPopupMenu;
    teste1: TMenuItem;
    criar_attOpc: TAction;
    criar_attMult: TAction;
    criar_attComp: TAction;
    ToolButton16: TToolButton;
    ToolButton18: TToolButton;
    ToolButton19: TToolButton;
    criar_attID: TAction;
    ToolButton20: TToolButton;
    editarDic: TAction;
    covToRest: TAction;
    convToOpc: TAction;
    dicFull: TAction;
    Sobre: TAction;
    LCriar_tabela: TAction;
    LCriar_Relacao: TAction;
    ToolLogica: TToolBar;
    ToolButton21: TToolButton;
    ToolButton22: TToolButton;
    LCriar_campo: TAction;
    ToolButton23: TToolButton;
    ToolButton24: TToolButton;
    ToolButton25: TToolButton;
    LCriar_Fk: TAction;
    LCriar_K: TAction;
    ToolButton29: TToolButton;
    cfg: TAction;
    LCriar_separador: TAction;
    ToolButton26: TToolButton;
    editarDicL: TAction;
    exp_Logico: TAction;
    NovoLogico: TAction;
    ToolButton27: TToolButton;
    ToolButton28: TToolButton;
    ToolButton30: TToolButton;
    ToolButton31: TToolButton;
    ToolButton32: TToolButton;
    ModeloOpc: TPopupMenu;
    Excluirseleo1: TMenuItem;
    GerarModeloLgico1: TMenuItem;
    Fechar1: TMenuItem;
    Salvar1: TMenuItem;
    N1: TMenuItem;
    ToolButton33: TToolButton;
    ToolButton34: TToolButton;
    Criar_TextoII: TAction;
    baseme: TPanel;
    Panel2: TPanel;
    ToolBar2: TToolBar;
    ToolButton35: TToolButton;
    ToolButton36: TToolButton;
    ToolButton37: TToolButton;
    ToolButton38: TToolButton;
    ToolButton39: TToolButton;
    ToolButton41: TToolButton;
    ToolButton40: TToolButton;
    ToolButton42: TToolButton;
    Util: TRichEdit;
    verLogs: TAction;
    limpar_logs: TAction;
    salva_logs: TAction;
    autoSalvar: TAction;
    TimerAutoSava: TTimer;
    act1: TAction;
    act2: TAction;
    act3: TAction;
    act4: TAction;
    act5: TAction;
    xsl_maker: TAction;
    SplitterFDP: TSplitter;
    org1: TMenuItem;
    selAtt: TAction;
    Selecionaratributos1: TMenuItem;
    ImprimirExportar1: TMenuItem;
    addXSLT: TAction;
    EditarFonte1: TMenuItem;
    N2: TMenuItem;
    PanEditor: TPanel;
    N3: TMenuItem;
    Copiar1: TMenuItem;
    Recortar1: TMenuItem;
    Colar1: TMenuItem;
    edt_Desfazer: TAction;
    edt_Refazer: TAction;
    ToolButton43: TToolButton;
    ToolButton44: TToolButton;
    ToolButton45: TToolButton;
    ToolButton46: TToolButton;
    ToolButton47: TToolButton;
    PanHelp: TPanel;
    Splitter2: TSplitter;
    lbl_ajuda: TLabel;
    aj_site: TAction;
    GerarFisico: TAction;
    fisicoTemplate: TAction;
    Ocultar1: TMenuItem;
    Editartemplatedeconvero1: TMenuItem;
    GerarEsquemaFsico1: TMenuItem;
    modExportBMP: TAction;
    modExportJPG: TAction;
    procedure modExportBMPExecute(Sender: TObject);
    procedure fisicoTemplateExecute(Sender: TObject);
    procedure GerarFisicoExecute(Sender: TObject);
    procedure aj_siteExecute(Sender: TObject);
    procedure edt_RefazerHint(var HintStr: string; var CanShow: Boolean);
    procedure edt_DesfazerHint(var HintStr: string; var CanShow: Boolean);
    procedure edt_RefazerExecute(Sender: TObject);
    procedure edt_DesfazerExecute(Sender: TObject);
    procedure edt_DesfazerUpdate(Sender: TObject);
    procedure sis_sairExecute(Sender: TObject);
    procedure ScrollerClick(Sender: TObject);
    procedure Splitter1Moved(Sender: TObject);
    procedure Splitter1CanResize(Sender: TObject; var NewSize: Integer;
      var Accept: Boolean);
    procedure Exibir_fonteExecute(Sender: TObject);
    procedure Exibir_fonteUpdate(Sender: TObject);
    procedure CriarExecute(Sender: TObject);
    procedure DelExecute(Sender: TObject);
    procedure criar_CancelarUpdate(Sender: TObject);
    procedure CriarUpdate(Sender: TObject);
    procedure criar_ligacaoUpdate(Sender: TObject);
    procedure promo_eaExecute(Sender: TObject);
    procedure promo_entidadeExecute(Sender: TObject);
    procedure TreeAttClick(Sender: TObject);
    procedure ao_NovoClick(Sender: TObject);
    procedure ao_EditarClick(Sender: TObject);
    procedure ao_ExcluirClick(Sender: TObject);
    procedure ao_exibirClick(Sender: TObject);
    procedure ao_OcultarExecute(Sender: TObject);
    procedure ac_orgAttExecute(Sender: TObject);
    procedure ImprimirExecute(Sender: TObject);
    procedure arq_SalvarExecute(Sender: TObject);
    procedure arq_salvarcExecute(Sender: TObject);
    procedure edt_copyExecute(Sender: TObject);
    procedure edt_cutExecute(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure arq_fecharExecute(Sender: TObject);
    procedure arq_fecharUpdate(Sender: TObject);
    procedure arq_novoExecute(Sender: TObject);

    procedure ModelosSelect(Sender: TObject);

    procedure Navega(Sender: TObject);
    procedure arq_abrirExecute(Sender: TObject);
    procedure FormCloseQuery(Sender: TObject; var CanClose: Boolean);
    procedure mod_exibirHintExecute(Sender: TObject);
    procedure edt_pasteExecute(Sender: TObject);
    procedure StatusDrawPanel(StatusBar: TStatusBar; Panel: TStatusPanel;
      const Rect: TRect);
    procedure Todos_modelosExecute(Sender: TObject);
    procedure Todos_objetosExecute(Sender: TObject);
    procedure MenuObjetosPopup(Sender: TObject);
    procedure MenuModelosPopup(Sender: TObject);
    procedure editarDicExecute(Sender: TObject);
    procedure covToRestExecute(Sender: TObject);
    procedure convToOpcExecute(Sender: TObject);
    procedure dicFullExecute(Sender: TObject);
    procedure SobreExecute(Sender: TObject);
    procedure LCriar_campoUpdate(Sender: TObject);
    procedure LCriar_RelacaoUpdate(Sender: TObject);
    procedure criar_EntidadeUpdate(Sender: TObject);
    procedure editarDicUpdate(Sender: TObject);
    procedure exp_LogicoExecute(Sender: TObject);
    procedure NovoLogicoExecute(Sender: TObject);
    procedure exp_LogicoUpdate(Sender: TObject);
    procedure FormDestroy(Sender: TObject);
    procedure verLogsExecute(Sender: TObject);
    procedure limpar_logsExecute(Sender: TObject);
    procedure salva_logsExecute(Sender: TObject);
    procedure BoxMouseWheelDown(Sender: TObject; Shift: TShiftState;
      MousePos: TPoint; var Handled: Boolean);
    procedure BoxMouseWheelUp(Sender: TObject; Shift: TShiftState;
      MousePos: TPoint; var Handled: Boolean);
    procedure autoSalvarExecute(Sender: TObject);
    procedure autoSalvarUpdate(Sender: TObject);
    procedure TimerAutoSavaTimer(Sender: TObject);
    procedure cfgExecute(Sender: TObject);
    procedure act1Execute(Sender: TObject);
    procedure act1Update(Sender: TObject);
    procedure xsl_makerExecute(Sender: TObject);
    procedure SplitterFDPCanResize(Sender: TObject; var NewSize: Integer;
      var Accept: Boolean);
    procedure selAttExecute(Sender: TObject);
    procedure ModeloOpcPopup(Sender: TObject);
    procedure addXSLTExecute(Sender: TObject);
  public
    Conf: TConfigura;
    Modelo: TModelo;
    SemModelo: boolean;
    //MngTemplate: TMngTemplate;
    Procedure OnSelecao(b: TBase);
    Procedure OnBaseMouseMove(base: TBase);
    Procedure OnModeloMudou(Sender: TObject);
    procedure VisualMouseMove(Sender: TObject; Shift: TShiftState; X,
    Y: Integer);
    Procedure Inicio;
    Procedure RefreshCfg;
    Procedure NovoArqCfg(FileName: String);
    Procedure Questao(TextoA, TextoB: string;topico_ajuda: integer; var ResultadoSugestao: Integer);
    Procedure onErro(BaseSender: TBase; Texto: string; tipoErro: integer);
    Procedure RealizeChecagem;
    Function QuerSalvarOModelo(M: TModelo; YtoA: boolean = false; jaYtoA: boolean = false; jaNtoA: boolean = false) : integer;
    Procedure AtiveModelo;
    Procedure OnLoadProgress(Porcentagem: Integer);
    Procedure BaseBeginUpdate(Sender: TObject);
    Procedure BaseEndUpdate(Sender: TObject);
    Procedure VisualKeyPress(Sender: TObject; var key: char);
    Procedure CrieNovoModelo(tipoModelo: integer);
  end;

var
  brFmPrincipal: TbrFmPrincipal;
  //controle
  pEditor: TInspector;
  BaseEisSelecionadaNestaUnit, OverB: TBase;

  Tabs: TTabImg;
  ListaDeObj, ListaDeMer: TGeralList;

  AjudaArquivos, ListaDeTrabalho: TStringList;

const S = 'Sim para todos';

implementation

uses Types, DateUtils, TypInfo, uDM, Math, fmodal, att, impressao,
  StrUtils, dic, dicFull, uSobre, CfgFonte, Questao, ajuda, config, XMLDoc,
  xsl, trocaXsl, dlg, uMemoria, uRegistraExten, uTemplFisico;

{$R *.dfm}

procedure TbrFmPrincipal.Inicio;
  var dir, arq: String;
      i: integer;
      strs: TStringList;
begin
  dir := ExtractFilePath(ParamStr(0)) + '\';
  if pos('\\', dir) > 0 then dir := ExtractFilePath(ParamStr(0));
  Conf := TConfigura.Create(self);
  Conf.Menu[1] := act1;
  Conf.Menu[2] := act2;
  Conf.Menu[3] := act3;
  Conf.Menu[4] := act4;
  Conf.Menu[5] := act5;
  Conf.Tempo := 5;
  Conf.dirLogico := dir;
  Conf.dirConceitual := dir;
  Conf.appDir := Dir;
  Conf.cfgFile := dir + 'Conf.chc';
  Conf.ExibirLog := false;
  Conf.showLHint := true;
  if FileExists(Conf.cfgFile) then
  begin
    try
      brDM.XMLDoc.LoadFromFile(Conf.cfgFile);
      brDM.XMLDoc.Active := true;
      Conf.LoadFromXML(brDM.XMLDoc.DocumentElement.ChildNodes);
    except
      onErro(nil, 'Erro ao abrir o arquivo de configuração!', 0);
    end;
  end;
  for i := 1 to 5 do
  begin
    if Conf.arq[i] <> '' then
    brfmCfg.arquivos.Items.Add(Conf.arq[i]);
  end;
  if Conf.Ajuda = '' then
  begin
    strs := TStringList.Create;
    AutoHelp(strs);
    Conf.Ajuda := strs.Text;
    strs.Free;
  end;
  
  verLogs.Checked := Conf.ExibirLog;
  verLogsExecute(nil);
  RefreshCfg;
  mod_exibirHint.Checked := Conf.showLHint;
  AjudaArquivos := TStringList.Create;
  AjudaLocal := AjudaArquivos;
  brDM.Visual := TVisual.Create(self);
  brDM.Visual.Parent := Box;
  brDM.Visual.OnSelected := onSelecao;
  brDM.Visual.OnModeloQuestion := Questao;
  brDM.Visual.onBaseMouseMove := OnBaseMouseMove;
  brDM.Visual.OnMouseMove := VisualMouseMove;
  brDM.Visual.OnErro := onErro;
  brDM.Visual.DXML := brDM.XMLDoc;
  brDM.Visual.ModeloMudou := OnModeloMudou;
  brDM.Visual.OnLoadProgress := OnLoadProgress;
  brDM.Visual.PopupMenu := ModeloOpc;
  brDM.Visual.Writer := TWriterMsg.Create(self);
  brDM.Visual.ImgLisa := brDM.img;
  Util.Lines.Clear;
  brDM.Visual.Writer.Writer := Util;
  pEditor := TInspector.Create(PanEditor);
  pEditor.Align := alClient;
  pEditor.onBeginUpdateBase := BaseBeginUpdate;
  pEditor.onEndUpdateBase := BaseEndUpdate;
  pEditor.EnviadorDeFocus := brDM.Visual;
  pEditor.Ajuda.LabelAjuda := lbl_ajuda;
  brDM.Visual.OnKeyPress := VisualKeyPress;

  Tabs := TTabImg.Create(Self);
  Tabs.Parent := PaiScroller;
  Tabs.OnTabClick := ScrollerClick;
  Tabs.Tabs.Add(TabSheet1.Caption);
  Tabs.Tabs.Add(TabSheet2.Caption);
  Tabs.TabIndex := 0;
  Tabs.Realinhe;

  criar_Entidade.Tag := Tool_Entidade;
  criar_relacionamento.Tag := Tool_Relacionamento;
  criar_GerEsp.Tag := Tool_Especializacao;
  Criar_espA.Tag := Tool_EspecializacaoA;
  Criar_espB.Tag := Tool_EspecializacaoB;
  criar_multiRelacao.Tag := Tool_EntidadeAssoss;
  criar_texto.Tag := Tool_Texto;
  criar_textoII.Tag := Tool_TextoII;
  criar_Cancelar.Tag := Tool_Nothing;

  criar_atributo.Tag := Tool_Atributo;
  criar_attOpc.Tag := Tool_AtributoOpc;
  criar_attMult.Tag := Tool_AtributoMult;
  criar_attComp.Tag := Tool_AtributoComp;
  criar_attID.Tag := Tool_AtributoID;

  criar_ligacao.Tag := Tool_Ligacao;
  criar_altorelacionamento.Tag := Tool_AutoRel;
  del_base.Tag := Tool_Del;

  LCriar_tabela.Tag := Tool_LOGICO_Tabela;
  LCriar_Relacao.Tag := Tool_LOGICO_Relacao;
  LCriar_campo.Tag := Tool_LOGICO_campo;
  LCriar_Fk.Tag := Tool_LOGICO_FK;
  LCriar_K.Tag := Tool_LOGICO_K;
  LCriar_separador.Tag := Tool_LOGICO_Separador;

  ListaDeObj := TGeralList.Create(Self);
  ListaDeMer := TGeralList.Create(Self);

  arq_novoExecute(Self);//criação do primeiro modelo
  ScrollerClick(nil);
  if ParamCount > 0 then
  begin
    arq := ParamStr(1);
    if not brDM.Visual.LoadFromFile(Arq, Modelo.Nome, Modelo) then
    begin
      brDM.Visual.Fecha;
      arq_novoExecute(Self);
    end else
    begin
      brDM.Visual.Modelo.Mudou := false;
      NovoArqCfg(Arq);
    end;
    Modelo := brDM.Visual.Modelo;
    if not Assigned(Modelo) then exit;
    AtiveModelo;
  end;
  brDM.Visual.Memoria.Habilitar := true;
end;

procedure TbrFmPrincipal.sis_sairExecute(Sender: TObject);
begin
  close;
end;

procedure TbrFmPrincipal.ScrollerClick(Sender: TObject);
begin
  Opcoes.ActivePageIndex := Tabs.TabIndex;
end;

procedure TbrFmPrincipal.Splitter1Moved(Sender: TObject);
begin
  Tabs.Realinhe;
end;

procedure TbrFmPrincipal.Splitter1CanResize(Sender: TObject; var NewSize: Integer;
  var Accept: Boolean);
begin
  Accept := NewSize > 30;
end;

procedure TbrFmPrincipal.OnSelecao(b: TBase);
  var itm: Inspector.TAbs;
      EA: TEntidadeAssoss;
      CA: TCardinalidade;
      AT: TAtributo;
      TP: TKind;
      ES: TEspecializacao;
      BR: TBaseRelacao;
      CM, CM2: TCampo;
      i, j, m: integer;
      TB: TTabela;
      TX: TTexto;
      tmp: string;
begin
  TreeAtt.Items.Clear;
  if Modelo.Selecionado <> nil then Modelo.Selecionado.AOcultos.Popule(TreeAtt, nil);
  TreeAttClick(b);

  Modelo.BaseHint.Visible := false;
  OverB := nil;
  if (b = nil) and (Modelo <> nil) then
  begin
    With pEditor do begin
      pEditor.Base := Modelo;
      itm := item[0];
      tmp := AnsiLowerCase(Modelo.GetStrTipoDeModelo);
      tmp[1] := UpCase(tmp[1]);
      itm.Caption := 'Informações: Modelo ' + tmp;
      itm.Tipo := tpTitulo;
      item[1].Setar('Nome', 'Nome', Modelo.Nome, tpReadOnly, 'NOME MODELO');
      item[2].Setar('Versao','Versão', Modelo.versao, tpReadOnly);
      item[3].Setar('Autor','Autor(es)', Modelo.Autor, tpEditor);
      item[4].Setar('Observacao', 'Observações', Modelo.Observacao, tpEditor);
    end;
    pEditor.Show;
    RealizeChecagem;
    exit;
  end;

  pEditor.Base := b;
  if b = nil then  exit;
  With pEditor do begin
    item[0].SetAsTitulo('Edição: ' + Denominar(B.ClassName));//converter e pegar o nome amigável...
    item[1].Setar('Nome', 'Nome', b.Nome, tpTexto, 'NOME');
    item[2].Setar('Observacoes', 'Observação', b.Observacoes, tpEditor, 'OBS');
//    item[3].Setar('OID', 'ID', IntToStr(b.OID), tpReadOnly, 'ID');
    item[3].SetAsTitulo('Posição e Tamanho');
    item[4].Setar('Left', 'Esquerda (Left)', IntToStr(b.Left), tpNumero, 'ALINHAMENTOLT');
    item[5].Setar('Top', 'Acima (Top)', IntToStr(b.Top), tpNumero, 'ALINHAMENTOLT');
    item[6].Setar('Width', 'Largura (Width)', IntToStr(b.Width), tpNumero, 'ALINHAMENTOWH');
    item[7].Setar('Height', 'Altura (Height)', IntToStr(b.Height), tpNumero, 'ALINHAMENTOWH');
    pEditor.FirstSelecao := item[1];
  end;

  if b is TBaseEntidade then
    With pEditor do
  begin
    pEditor.NextItem.SetAsTitulo('Esquema');
    itm := pEditor.NextItem;
    itm.SetarROBooleano('AutoRelacionado', 'Auto relacionado', TBaseEntidade(b).AutoRelacionado, 'Auto Relacionado');
  end;

  if b is TEntidade then
    With pEditor do
  begin
    pEditor.NextItem.SetarROBooleano('Especializada', 'Especializada', TEntidade(b).Especializada, 'Especializada');
  end;

  if b is TEntidadeAssoss then
    With pEditor do
  begin
    EA := TEntidadeAssoss(b);
    pEditor.NextItem.SetAsTitulo('Relacionamento');
    pEditor.NextItem.Setar('RelacaoNome', '+Nome', EA.Nome, tpTexto, 'Ent. Ass. Relação: Nome');
    pEditor.NextItem.Setar('RelecaoDicionario', '+Dicionário', EA.Dicionario, tpTexto, 'Ent. Ass. Relação: Dicionario');
    pEditor.NextItem.Setar('RelecaoObservacao', '+Observação', EA.Observacoes, tpTexto, 'Ent. Ass. Relação: Observacao');
    itm := pEditor.NextItem;
    if pEditor.BaseMudou then
    begin
      itm.ComboConversor.Largura := 7;
      itm.ComboConversor.Add('Não mostrar', 0);
      itm.ComboConversor.Add('A) /\', 1);
      itm.ComboConversor.Add('A) \/', 2);
      //itm.ComboConversor.Add('A) >', 3);
      //itm.ComboConversor.Add('A) <', 4);
      itm.ComboConversor.Add('B) \/', 5);
      itm.ComboConversor.Add('B) /\', 6);
      itm.ComboConversor.Add('B) <', 7);
      itm.ComboConversor.Add('B) >', 8);
    end;
    itm.Setar('SetaDirecao', '+Direção', itm.ComboConversor.GetByVal(EA.SetaDirecao), tpMenu, 'RPOSISETA');
  end;

  if (b is TMaxRelacao) or (b is TLigaTabela) then
    With pEditor do
  begin
    BR := TBaseRelacao(b);
    itm := pEditor.NextItem;
    if pEditor.BaseMudou then
    begin
      itm.ComboConversor.Largura := 9;
      itm.ComboConversor.Add('Não mostrar', 0);
      itm.ComboConversor.Add('A) /\', 1);
      itm.ComboConversor.Add('A) \/', 2);
      itm.ComboConversor.Add('A) >', 3);
      itm.ComboConversor.Add('A) <', 4);
      itm.ComboConversor.Add('B) \/', 5);
      itm.ComboConversor.Add('B) /\', 6);
      itm.ComboConversor.Add('B) <', 7);
      itm.ComboConversor.Add('B) >', 8);
    end;
    itm.Setar('SetaDirecao', 'Direção', itm.ComboConversor.GetByVal(BR.SetaDirecao), tpMenu, 'RPOSISETA');
  end;

  if b is TCardinalidade then
    With pEditor do
  begin
    CA := TCardinalidade(b);
    item[1].Caption := 'Papel';
    item[1].CodAjuda := 'PAPEL';
    NextItem.SetarBooleano('Fixa', 'Fixar posição', CA.Fixa, 'Card. Fixar posição');

    itm := pEditor.NextItem;
    if pEditor.BaseMudou then
    begin
      itm.ComboConversor.Largura := 2;
      itm.ComboConversor.Add('H. Vert.', OrientacaoV);
      itm.ComboConversor.Add('H. Horz.', OrientacaoH);
    end;
    itm.Setar('OrientacaoLinha', 'Posição da Linha', itm.ComboConversor.GetByVal(CA.OrientacaoLinha), tpMenu, 'Card. Posição da Linha');

    pEditor.NextItem.SetarBooleano('TamAuto', 'Tamanho aut.', CA.TamAuto, 'Card. Tamanho aut.');
    pEditor.NextItem.SetAsTitulo('Esquema');
    if (Modelo.TipoDeModelo = tpModeloConceitual) then
      pEditor.NextItem.SetarBooleano('Fraca', 'Entidade fraca', CA.Fraca, 'Entidade fraca');
    itm := pEditor.NextItem;
    if pEditor.BaseMudou then
    begin
      itm.ComboConversor.Largura := 4;
      itm.ComboConversor.Add('(1,1)', 1);
      itm.ComboConversor.Add('(0,1)', 2);
      itm.ComboConversor.Add('(1,n)', 3);
      itm.ComboConversor.Add('(0,n)', 4);
    end;
    Itm.Setar('Cardinalidade', 'Cardinalidade', itm.ComboConversor.GetByVal(CA.Cardinalidade), tpMenu, 'Cardinalidade');
  end;

  if b is TAtributo then
    With pEditor do
  begin
    AT := TAtributo(b);
    pEditor.NextItem.SetarBooleano('TamAuto', 'Tamanho aut.', At.TamAuto, 'Atrib. tamanho aut.');
    if AT.Dono is TBaseRelacao then
    pEditor.NextItem.Setar('Desvio', 'Desvio', IntToStr(AT.Desvio), tpNumero, 'Atrib. Desvio');
    itm := pEditor.NextItem;
    if pEditor.BaseMudou then
    begin
      itm.ComboConversor.Largura := 2;
      itm.ComboConversor.Add('Direito', OrientacaoD);
      itm.ComboConversor.Add('Esquerdo', OrientacaoE);
    end;
    itm.Setar('ForcaOrientacao', 'Lado', itm.ComboConversor.GetByVal(AT.ForcaOrientacao), tpMenu, 'Posicionamento');
    pEditor.NextItem.SetAsTitulo('Esquema');

    pEditor.NextItem.SetarBooleano('Identificador', 'Identificador', AT.Identificador, 'Identificador');
    pEditor.NextItem.SetarBooleano('Opcional', 'Opcional', AT.Opcional, 'Opcional');
    pEditor.NextItem.SetarROBooleano('Composto', 'Composto', AT.Composto, 'Composto');
    pEditor.NextItem.SetarBooleano('Multivalorado', 'Multivalorado', AT.Multivalorado, 'Multivalorado');

    itm := pEditor.NextItem;
    itm.Generete(2, false, 0, '0');
    if AT.Multivalorado then TP := tpMenu else TP := tpMenuReadOnly;
    itm.Setar('MinCard', 'Card. Mínima', itm.ComboConversor.GetByVal(AT.MinCard), tp, 'Card. Mínima');

    itm := pEditor.NextItem;
    itm.Generete(21, false, 0, '0');
    itm.ComboConversor.Itens[0].Texto := 'n';
    itm.ComboConversor.Itens[0].Valor := '21';
    itm.Setar('MaxCard', 'Card. Máxima', itm.ComboConversor.GetByVal(AT.MaxCard), tp, 'Card. Máxima');
    pEditor.NextItem.Setar('TipoDoValor', 'Tipo (opcional):', AT.TipoDoValor, tpTexto, 'TipoDoValor');
  end;

  if b is TEspecializacao then
    With pEditor do
  begin
    ES := TEspecializacao(b);
    pEditor.NextItem.SetAsTitulo('Esquema');
    pEditor.NextItem.SetarROBooleano('Restrito', 'Exclusiva', ES.Restrito, 'Exclusiva');
    pEditor.NextItem.SetarBooleano('Parcial', 'Esp. Parcial', ES.Parcial, 'Esp. Parcial');
  end;

  if b is TLigaTabela then
    With pEditor do
  begin
    item[6].JustAlterTipo(tpReadOnly);
    item[7].JustAlterTipo(tpReadOnly);
  end;

  if b is TCampo then
    With pEditor do
  begin
    CM := TCampo(b);
    itm := item[1];
    if pEditor.BaseMudou then
    begin
      Modelo.Template.GeraLista(ListaDeTrabalho, fisicoTpCamposNome);
      itm.ComboConversor.Largura := ListaDeTrabalho.Count;
      for I := 0 to ListaDeTrabalho.Count - 1 do
      begin
        itm.ComboConversor.Add(ListaDeTrabalho[i], ListaDeTrabalho[i]);
      end;
    end;
    itm.Setar('Nome', 'Nome', b.Nome, tpEdtLstDrop, 'NOME');

    itm := pEditor.NextItem;
    itm.Generete(CM.Dono.Campos.Count, false, 1, '00');
    itm.Setar('oIndex', 'Posição (Índice)', itm.ComboConversor.GetByVal(CM.oIndex), tpMenu, 'Posição (Índice)');
    pEditor.NextItem.SetAsTitulo('Esquema');
    item[4].JustAlterTipo(tpReadOnly);
    item[5].JustAlterTipo(tpReadOnly);
    item[6].JustAlterTipo(tpReadOnly);
    item[7].JustAlterTipo(tpReadOnly);
    if not CM.ApenasSeparador then
    begin
      pEditor.NextItem.SetarBooleano('isKey', 'Chave Primária', CM.IsKey, 'Chave Primária');
      pEditor.NextItem.SetarBooleano('isFKey', 'Chave Estrangeira', CM.IsFKey, 'Chave Estrangeira');
      if CM.IsFKey then
        pEditor.NextItem.Setar('Tipo', 'Tipo (Obrigatório):', CM.Tipo, tpReadOnly, 'Tipo')
      else begin
        //pEditor.NextItem.Setar('Tipo', 'Tipo (Obrigatório):', CM.Tipo, tpTexto, 'Tipo');
        itm := pEditor.NextItem;
        if pEditor.BaseMudou then
        begin
          Modelo.Template.GeraLista(ListaDeTrabalho, fisicoTpCamposTipo);
          itm.ComboConversor.Largura := ListaDeTrabalho.Count;
          for I := 0 to ListaDeTrabalho.Count - 1 do
          begin
            itm.ComboConversor.Add(ListaDeTrabalho[i], ListaDeTrabalho[i]);
          end;
        end;
        itm.Setar('Tipo', 'Tipo (Obrigatório):', CM.Tipo, tpEdtLstDrop, 'Tipo');
      end;

      pEditor.NextItem.SetAsTitulo('IR');
      if CM.IsFKey then
      begin
        Modelo.TabelasLigadas(ListaDeObj, CM.Dono);
        itm := pEditor.NextItem;
//        if pEditor.BaseMudou then
//        begin
        itm.ComboConversor.Largura := ListaDeObj.Lista.Count + 1;
        itm.ComboConversor.Add('<nenhum>', 0);
        for i := 0 to ListaDeObj.Lista.Count -1 do
         itm.ComboConversor.Add(ListaDeObj[i].Texto, ListaDeObj[i].Tag);
//        end;
        J := CM.TabOrigem;
        itm.Setar('TabOrigem', 'Tab. Origem', itm.ComboConversor.GetByVal(J), tpMenu, 'TabOrigem');

        itm := pEditor.NextItem;
        if J > 0 then
        begin
          m := 1;
          for i := 0 to CM.TabelaDeOrigem.Campos.Count -1 do
             if TCampo(CM.TabelaDeOrigem.Campos[i]).IsKey then inc(m);

          itm.ComboConversor.Largura := m;
          itm.ComboConversor.Add('<nenhum>', 0);
          for i := 0 to CM.TabelaDeOrigem.Campos.Count -1 do
          begin
            CM2 := TCampo(CM.TabelaDeOrigem.Campos[i]);
            if CM2.IsKey AND (CM2 <> CM) then
              itm.ComboConversor.Add(CM2.Nome, CM2.oID);
          end;
          itm.Setar('CampoOrigem', 'Campo Origem', itm.ComboConversor.GetByVal(CM.CampoOrigem), tpMenu, 'CampoOrigem');
        end else itm.Setar('CampoOrigem', 'Campo Origem', '<nenhum>', tpReadOnly, 'CampoOrigem');
        pEditor.NextItem.SetAsTitulo('DDL');

        itm := pEditor.NextItem;
        itm.ComboConversor.Largura := 5;
        for i := 0 to 4 do
         itm.ComboConversor.Add(DDLActionToStr(i), i);
        Itm.Setar('ddlOnUpdate', 'On Update', DDLActionToStr(CM.ddlOnUpdate), tpMenu, 'OnUpdate');

        itm := pEditor.NextItem;
        itm.ComboConversor.Largura := 5;
        for i := 0 to 4 do
         itm.ComboConversor.Add(DDLActionToStr(i), i);
        Itm.Setar('ddlOnDelete', 'On Delete', DDLActionToStr(CM.ddlOnDelete), tpMenu, 'OnDelete');

      end else
      begin
        pEditor.NextItem.Setar('TabOrigem', 'Tab. Origem', '<nenhum>', tpReadOnly, 'TabOrigem');
        pEditor.NextItem.Setar('CampoOrigem', 'Campo Origem', '<nenhum>', tpReadOnly, 'CampoOrigem');
        pEditor.NextItem.SetAsTitulo('DDL');
        pEditor.NextItem.Setar('ddlOnUpdate', 'On Update', DDLActionToStr(CM.ddlOnUpdate), tpReadOnly, 'OnUpdate');
        pEditor.NextItem.Setar('ddlOnDelecte', 'On Delete', DDLActionToStr(CM.ddlOnDelete), tpReadOnly, 'OnDelete');
      end;

      itm := pEditor.NextItem;
      if pEditor.BaseMudou then
      begin
        Modelo.Template.GeraLista(ListaDeTrabalho, fisicoTpCamposCoplemento);
        itm.ComboConversor.Largura := ListaDeTrabalho.Count;
        for I := 0 to ListaDeTrabalho.Count - 1 do
        begin
          itm.ComboConversor.Add(ListaDeTrabalho[i], ListaDeTrabalho[i]);
        end;
      end;
      itm.Setar('Complemento', 'Complemento', CM.Complemento, tpEdtLstDrop, 'TBComplemento');
      //pEditor.NextItem.Setar('Complemento', 'Complemento', CM.Complemento, tpTexto, 'CPComplemento');
    end;
  end;

  if b is TTabela then
    With pEditor do
  begin
    TB := TTabela(b);
    pEditor.NextItem.SetAsTitulo('Esquema');
    pEditor.NextItem.Setar('Color', 'Cor', ColorToString(TB.Color), tpCor, 'Cor');
    pEditor.NextItem.Setar('QtdCampos', 'Qtd. Campos', IntToStr(TB.QtdCampos), tpReadOnly, 'Qtd. Campos');
    pEditor.NextItem.SetAsTitulo('Integridade');
    pEditor.NextItem.Setar('Chaves', 'Chaves', '[' + TB.Chaves + ']', tpReadOnly, 'TBChaves');
    pEditor.NextItem.SetAsTitulo('DDL');
    itm := pEditor.NextItem;
    if pEditor.BaseMudou then
    begin
      itm.ComboConversor.Largura := Modelo.QtdTabela + 1;
      itm.ComboConversor.Add('Não Informado', 0);
      for I := 1 to Modelo.QtdTabela do
      begin
        itm.ComboConversor.Add(IntToStr(I), i);
      end;
    end;
    itm.Setar('cOrdem', 'Ordem Conversão', itm.ComboConversor.GetByVal(TB.cOrdem), tpMenu, 'TBcOrdem');
    itm := pEditor.NextItem;
    if pEditor.BaseMudou then
    begin
      Modelo.Template.GeraLista(ListaDeTrabalho, fisicoTpTabelaCoplemento);
      itm.ComboConversor.Largura := ListaDeTrabalho.Count;
      for I := 0 to ListaDeTrabalho.Count - 1 do
      begin
        itm.ComboConversor.Add(ListaDeTrabalho[i], ListaDeTrabalho[i]);
      end;
    end;
    itm.Setar('Complemento', 'Complemento', TB.Complemento, tpEdtLstDrop, 'TBComplemento');
  end;

  if b is TTexto then
    With pEditor do
  begin
    pEditor.FirstSelecao := nil;
    TX := TTexto(b);
    item[1].JustAlterTipo(tpEditor);
    item[1].Caption := 'Texto';
    item[1].CodAjuda := 'TEXTO TEXTO';
    pEditor.NextItem.SetarBooleano('TamAuto', 'Tamanho aut.', TX.TamAuto, 'Texto TamAuto');
    pEditor.NextItem.SetAsTitulo('Estilo');
    if TX.Tipo = TextoTipoBranco then TP := tpReadOnly else TP := tpCor;
    pEditor.NextItem.Setar('Cor', 'Cor', ColorToString(TX.Cor), tp, 'Texto Cor');

    itm := pEditor.NextItem;
    if pEditor.BaseMudou then
    begin
      itm.ComboConversor.Largura := 3;
      itm.ComboConversor.Add('Vazio', TextoTipoBranco);
      itm.ComboConversor.Add('Caixa', TextoTipoBox);
      itm.ComboConversor.Add('Hint', TextoTipoHint);
    end;
    itm.Setar('Tipo', 'Moldura', itm.ComboConversor.GetByVal(TX.Tipo), tpMenu, 'Moldura');
    itm := pEditor.NextItem;
    if pEditor.BaseMudou then
    begin
      itm.ComboConversor.Largura := 3;
      itm.ComboConversor.Add('Esquerda', TextoAlinEsq);
      itm.ComboConversor.Add('Centro', TextoAlinCen);
      itm.ComboConversor.Add('Direita', TextoAlinDir);
    end;
    itm.Setar('TextAlin', 'Alin. Texto', itm.ComboConversor.GetByVal(TX.TextAlin), tpMenu, 'Alin. Texto');
  end;
  pEditor.Show;
  RealizeChecagem;
end;

procedure TbrFmPrincipal.OnBaseMouseMove(base: TBase);
begin
  Status.Panels[3].Text := base.Nome;
  Status.Panels[5].Text := base.Observacoes;

  if (mod_exibirHint.Checked) and (base <> OverB) then
    if base.AOcultos.AtributosOcultos.Count > 0 then
      Modelo.BaseHint.Show(
        base.BoundsRect,
        base.AtributosOcultosToTexto);
  OverB := base;
end;

procedure TbrFmPrincipal.VisualKeyPress(Sender: TObject; var key: char);
begin
  if not (key in [#9, #13, #27])  then
  begin
    pEditor.ReciverKey(word(key));
    key := #0;
  end;
end;

procedure TbrFmPrincipal.VisualMouseMove(Sender: TObject; Shift: TShiftState; X,
  Y: Integer);
  var P: TPoint;
begin
  if SemModelo then Exit;
  Status.Panels[3].Text := '';
  if Modelo.Ferramenta <> 0 then
  begin
    P := Modelo.ScreenToClient(Mouse.CursorPos);
    Status.Panels[1].Text := IntToStr(P.X);
    Status.Panels[2].Text := IntToStr(P.Y);
  end
  else
  begin
    Status.Panels[5].Text := '';
    Status.Panels[1].Text := '';
    Status.Panels[2].Text := '';
  end;
  Modelo.BaseHint.Visible := false;
  OverB := nil;
end;

procedure TbrFmPrincipal.Exibir_fonteExecute(Sender: TObject);
begin
  brFmtCfgFonte.OpcoesGerais.ActivePage := brFmtCfgFonte.TabFont;
  brFmtCfgFonte.OpcoesGeraisChange(sender);
  If not brFmtCfgFonte.Visible then brFmtCfgFonte.Show;
end;

procedure TbrFmPrincipal.Exibir_fonteUpdate(Sender: TObject);
begin
  if SemModelo then Exit;
  Exibir_fonte.Enabled := (Modelo.Selecionado <> nil);
end;

procedure TbrFmPrincipal.CriarExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  if Modelo.Ferramenta <> TAction(Sender).Tag then
    Modelo.Ferramenta := TAction(Sender).Tag else
    Modelo.Ferramenta := Tool_Nothing;
end;

procedure TbrFmPrincipal.onErro(BaseSender: TBase; Texto: string;
  tipoErro: integer);
begin
  if tipoErro = 0 then
    Application.MessageBox(PChar(Texto), 'Erro na Operação', MB_OK or MB_ICONERROR)
  else
    Application.MessageBox(PChar(Texto), 'Aviso:', MB_OK or MB_ICONWARNING);
end;

procedure TbrFmPrincipal.DelExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  Modelo.DeleteSelection;
end;

procedure TbrFmPrincipal.criar_CancelarUpdate(Sender: TObject);
begin
  if SemModelo then Exit;
  (Sender as TAction).Enabled := Modelo.Ferramenta <> 0;
end;

procedure TbrFmPrincipal.CriarUpdate(Sender: TObject);
  var a: TAction;
begin
  if SemModelo then Exit;
  A := (Sender as TAction);
  if (A <> del_base) then
  begin
    if (A.Tag in
       [Tool_Especializacao, Tool_EspecializacaoA, Tool_EspecializacaoB, Tool_AutoRel])
    then A.Enabled := Modelo.QtdEntidade > 0 else A.Enabled := (Modelo.QtdBase > 0) and (Modelo.TipoDeModelo = tpModeloConceitual);
  end;
  del_base.Enabled := Modelo.QtdBase > 0;
  edt_copy.Enabled := Modelo.Selecionado <> nil;
  edt_cut.Enabled := edt_copy.Enabled;
  edt_paste.Enabled := Modelo.PodeColar;
  if (Modelo.Ferramenta = Tool_Nothing) then criar_Cancelar.Checked := true;
end;

procedure TbrFmPrincipal.criar_ligacaoUpdate(Sender: TObject);
begin
  if SemModelo then Exit;
  (Sender as TAction).Enabled := (Modelo.QtdEntidade > 1) or ((Modelo.QtdEntidade = 1) and (Modelo.QtdBase > 1));
end;

procedure TbrFmPrincipal.CrieNovoModelo(tipoModelo: integer);
begin
  Modelo := brDM.Visual.gera('');
  Modelo.TransformTo(tipoModelo);
  AtiveModelo;
end;

procedure TbrFmPrincipal.promo_eaExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  if (Modelo.Selecionado <> nil) and (Modelo.Selecionado is TRelacao) then
    if not Modelo.PromoverAEntAss(TRelacao(Modelo.Selecionado)) then
      onErro(nil, 'Não foi possível promover a relação à entidade associativa!', 0);
end;

procedure TbrFmPrincipal.promo_entidadeExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  if (Modelo.Selecionado <> nil) and (Modelo.Selecionado is TAtributo) then
    if not Modelo.PromoverAEntidade(TAtributo(Modelo.Selecionado)) then
      onErro(nil, 'Não foi possível promover o atributo à entidade!', 0);
end;

procedure TbrFmPrincipal.TreeAttClick(Sender: TObject);
  var PA: TAtributoOculto;
      Node: TTreeNode;
begin
  ao_Excluir.Enabled := false;
  ao_Editar.Enabled := false;
  ao_Novo.Enabled := false;
  ao_exibir.Enabled := false;
  if SemModelo then Exit;
  if (Modelo.Selecionado = nil) or (Modelo.Selecionado is TBaseTexto)  or (Modelo.Selecionado is TEspecializacao) then Exit;
  ao_Novo.Enabled := True;
  Node := TreeAtt.Selected;
  if not Assigned(Node) then exit;
  Pa := Modelo.Selecionado.AOcultos.FindByNode(node);
  if Assigned(Pa) then
  begin
    ao_Excluir.Enabled := True;
    ao_Editar.Enabled := True;
    if not Assigned(PA.Pai) {and not (Modelo.Selecionado is TAtributo)} then ao_exibir.Enabled := True;
  end;
end;

procedure TbrFmPrincipal.ao_NovoClick(Sender: TObject);
  var PA: TAtributoOculto;
      Node: TTreeNode;
begin
  if SemModelo then Exit;
  if (Modelo.Selecionado = nil) or (Modelo.Selecionado is TBaseTexto)  or (Modelo.Selecionado is TEspecializacao) then Exit;
  Node := TreeAtt.Selected;
  Pa := nil;
  if Assigned(Node) then Pa := Modelo.Selecionado.AOcultos.FindByNode(node);
  if Assigned(Pa) then
  begin
    brFmFModal.Pai.ItemIndex := 0;
    brFmFModal.Pai.Enabled := true;
  end else
  begin
    brFmFModal.Pai.ItemIndex := 1;
    brFmFModal.Pai.Enabled := False;
  end;
  brFmFModal.EmEdicao.Nome := '';
  brFmFModal.EmEdicao.Tipo := '';
  brFmFModal.EmEdicao.Max := 0;
  brFmFModal.EmEdicao.Multivalorado := false;
  brFmFModal.EmEdicao.Identificador := false;
  brFmFModal.EmEdicao.Composto := false;
  brFmFModal.Monta;
  if (brFmFModal.ShowModal <> mrOk) then exit;
  if brFmFModal.nome.Text = '' then
  begin
    onErro(nil, 'Nome do atributo inválido!', 0);
    exit;
  end;
  if (Assigned(Pa) and (brFmFModal.Pai.ItemIndex = 0)) then
    Pa.NovoFilho(brFmFModal.EmEdicao.Nome,
                                           brFmFModal.EmEdicao.Tipo,
                                           Point(-1, -1),
                                           brFmFModal.EmEdicao.Identificador,
                                           Point(brFmFModal.EmEdicao.Min,brFmFModal.EmEdicao.Max)
                                           )
  else
    Modelo.Selecionado.AOcultos.NovoAtributo(brFmFModal.EmEdicao.Nome,
                                           brFmFModal.EmEdicao.Tipo,
                                           Point(-1, -1),
                                           brFmFModal.EmEdicao.Identificador,
                                           Point(brFmFModal.EmEdicao.Min,brFmFModal.EmEdicao.Max)
                                           );
  OnSelecao(Modelo.Selecionado);
end;

procedure TbrFmPrincipal.ao_EditarClick(Sender: TObject);
  var PA: TAtributoOculto;
      Node: TTreeNode;
begin
  if SemModelo then Exit;
  if (Modelo.Selecionado = nil) or (Modelo.Selecionado is TBaseTexto)  or (Modelo.Selecionado is TEspecializacao) then Exit;
  Node := TreeAtt.Selected;
  Pa := nil;
  if Assigned(Node) then Pa := Modelo.Selecionado.AOcultos.FindByNode(node);
  if not Assigned(Pa) then
  begin
    onErro(nil, 'Selecione um atributo válido!', 0);
    exit;
  end else
  begin
    brFmFModal.Pai.ItemIndex := 1;
    brFmFModal.Pai.Enabled := false;
  end;
  brFmFModal.EmEdicao.Nome := pa.Nome;
  brFmFModal.EmEdicao.Tipo := pa.Tipo;
  if pa.Multivalorado then
  begin
    brFmFModal.EmEdicao.Max := pa.MaxCard;
    brFmFModal.EmEdicao.Min := pa.MinCard;
  end else brFmFModal.EmEdicao.Max := 0;
  brFmFModal.EmEdicao.Multivalorado := pa.Multivalorado;
  brFmFModal.EmEdicao.Identificador := pa.Identificador;
  brFmFModal.EmEdicao.Composto := pa.Composto;
  brFmFModal.Monta;

  if (brFmFModal.ShowModal <> mrOk) then exit;
  if brFmFModal.nome.Text = '' then
  begin
    onErro(nil, 'Nome do atributo inválido!', 0);
    exit;
  end;
  Pa.Nome := brFmFModal.EmEdicao.Nome;
  Pa.MaxCard := brFmFModal.EmEdicao.Max;
  Pa.MinCard := brFmFModal.EmEdicao.Min;
  PA.Identificador := brFmFModal.EmEdicao.Identificador;
  PA.Tipo := brFmFModal.EmEdicao.Tipo;
  OnSelecao(Modelo.Selecionado);
end;

procedure TbrFmPrincipal.ao_ExcluirClick(Sender: TObject);
  var PA: TAtributoOculto;
      Node: TTreeNode;
begin
  if SemModelo then Exit;
  if (Modelo.Selecionado = nil) or (Modelo.Selecionado is TBaseTexto)  or (Modelo.Selecionado is TEspecializacao) then Exit;
  Node := TreeAtt.Selected;
  Pa := nil;
  if Assigned(Node) then Pa := Modelo.Selecionado.AOcultos.FindByNode(node);
  if not Assigned(Pa) then
  begin
    onErro(nil, 'Selecione um atributo válido!', 0);
    exit;
  end;
  if Application.MessageBox(pchar('Confirma a exclusão do atributo "' + Pa.Nome + '"?'),
                            'Atributo oculto',
                            MB_YESNO or MB_ICONQUESTION or MB_DEFBUTTON1) = mrYes then
  FreeAndNil(PA);
  OnSelecao(Modelo.Selecionado);
end;

procedure TbrFmPrincipal.ao_exibirClick(Sender: TObject);
  var PA: TAtributoOculto;
      Node: TTreeNode;
begin
  if SemModelo then Exit;
  if (Modelo.Selecionado = nil) or (Modelo.Selecionado is TBaseTexto) or
     (Modelo.Selecionado is TEspecializacao) {or (Modelo.Selecionado is TAtributo)}
  then Exit;
  Node := TreeAtt.Selected;
  Pa := nil;
  if Assigned(Node) then Pa := Modelo.Selecionado.AOcultos.FindByNode(node);
  if (not Assigned(Pa)) or not (Pa.Pai = nil) then
  begin
    onErro(nil, 'Selecione um atributo válido!', 0);
    exit;
  end;

  if Modelo.MostraAtributoOculto(PA, Modelo.Selecionado) then FreeAndNil(PA);
  OnSelecao(Modelo.Selecionado);
end;

procedure TbrFmPrincipal.ao_OcultarExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  if (Modelo.Selecionado <> nil) and (Modelo.Selecionado is TAtributo) then
    if not Modelo.OcultarAtributo(TAtributo(Modelo.Selecionado)) then
      onErro(nil, 'Não foi possível ocultar o atributo!', 0);
end;

procedure TbrFmPrincipal.ac_orgAttExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  if (Modelo.Selecionado <> nil) and (Modelo.TipoDeModelo = tpModeloConceitual) then Modelo.Selecionado.OrganizeAtributos;
end;

procedure TbrFmPrincipal.RealizeChecagem;
begin
  if SemModelo then Exit;
  Del.Enabled := Modelo.Selecionado <> nil;
  ac_orgAtt.Enabled := (Del.Enabled) and (Modelo.Selecionado.Atributos.Count > 0) and not(Modelo.Selecionado is TBaseRelacao);
  selAtt.Enabled := (Del.Enabled) and ((Modelo.Selecionado.Atributos.Count > 0) or (Modelo.TotalSelecionado > 1)) and (Modelo.TipoDeModelo = tpModeloConceitual);
  ac_orgAtt.Enabled := (Modelo.TipoDeModelo = tpModeloConceitual) and (ac_orgAtt.Enabled);
  if (Modelo.Selecionado is TAtributo) then
    if TAtributo(Modelo.Selecionado).Barra.Atributos.Count > 0 then
    begin
      ac_orgAtt.Enabled := true;
      selAtt.Enabled := true;
    end;
  //end
  promo_ea.Enabled := (Modelo.Selecionado is TRelacao);
  promo_entidade.Enabled := ((Modelo.Selecionado is TAtributo) and not(TAtributo(Modelo.Selecionado).Dono is TBarraDeAtributos));
  ao_Ocultar.Enabled := (Modelo.Selecionado is TAtributo);
  covToRest.Enabled := (Modelo.Selecionado is TEspecializacao) and not (TEspecializacao(Modelo.Selecionado).Restrito);
  convToOpc.Enabled := (Modelo.Selecionado is TEspecializacao) and (TEspecializacao(Modelo.Selecionado).Restrito);
end;

procedure TbrFmPrincipal.ImprimirExecute(Sender: TObject);
 var bkp: Boolean;
begin
  if SemModelo then Exit;
  bkp := Modelo.Mudou;
  Modelo.EveryHideShowSelection(nil, false);
  Modelo.BaseHint.Visible := false;
  try
    brFmImpress.Maker.make(Modelo);
    brFmImpress.ShowModal;
  except
    onErro(nil, 'O Sistema Operacional não conseguiu gerar a página de impressão!', 0);
  end;
  Modelo.EveryHideShowSelection(nil, true);
  brFmImpress.Maker.Imagem.Picture := nil;
  Modelo.Mudou := bkp;
  Modelo.Invalidate;
end;

procedure TbrFmPrincipal.arq_SalvarExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  if Modelo.Novo then arq_salvarcExecute(sender) else
  begin
    if Modelo.Salvar then NovoArqCfg(Modelo.Arquivo);
  end;
end;

procedure TbrFmPrincipal.arq_salvarcExecute(Sender: TObject);
  var tmp: string;
begin
  if (Modelo.TipoDeModelo in [tpModeloLogico, tpModeloFisico]) then brDM.SavaModelo.InitialDir := Conf.dirLogico else
    brDM.SavaModelo.InitialDir := Conf.dirConceitual;
  if Modelo.Arquivo <> '' then
  begin
    tmp := AnsiUpperCase(ExtractFileExt(Modelo.Arquivo));
    if (tmp = '.BRM') then brDM.SavaModelo.FilterIndex := 1
    else brDM.SavaModelo.FilterIndex := 2;
  end else brDM.SavaModelo.FilterIndex := 1;
//  if brDM.SavaModelo.FilterIndex = 1 then
//    brDM.SavaModelo.FileName := Modelo.Nome + '.brM' else brDM.SavaModelo.FileName := Modelo.Nome + '.xml';
  brDM.SavaModelo.FileName := Modelo.Nome;
  if SemModelo then Exit;
  with brDM.SavaModelo do
    if Execute then
  begin
    tmp := AnsiUpperCase(ExtractFileExt(FileName));
    //if (tmp <> '.BRM') and (tmp <> '.XML') then
    if FilterIndex = 1 then
       FileName := ChangeFileExt(FileName, '.brM')
         else FileName := ChangeFileExt(FileName, '.xml');
    if Modelo.Salvar(FileName) then NovoArqCfg(FileName);
  end;
end;

procedure TbrFmPrincipal.edt_copyExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  if brDM.Visual.Focused then Modelo.Copiar;
end;

procedure TbrFmPrincipal.edt_cutExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  if not brDM.Visual.Focused then Exit;
  if (Modelo.TotalSelecionado > 1) then
    onErro(nil, 'Apenas a primeira seleção será recortada, as demais serão copiadas!', 1);
  if Modelo.Copiar then
    Modelo.ProcesseBaseClick(Modelo.Selecionado, Tool_Del);
end;

procedure TbrFmPrincipal.edt_DesfazerExecute(Sender: TObject);
begin
  if not brDM.Visual.Memoria.Desfazer then
  Application.MessageBox('Impossível desfazer', 'Impossível desfazer', MB_OK or MB_ICONWARNING)
  else Modelo.Ferramenta := Tool_Nothing;
end;

procedure TbrFmPrincipal.edt_DesfazerHint(var HintStr: string; var CanShow: Boolean);
begin
  HintStr := 'Desfazer [' + brDM.Visual.Memoria.StrQtdDesfazer + ']';
end;

procedure TbrFmPrincipal.edt_DesfazerUpdate(Sender: TObject);
begin
  edt_Desfazer.Enabled := not SemModelo and brDM.Visual.Memoria.PodeDesfazer;
  edt_Refazer.Enabled := not SemModelo and brDM.Visual.Memoria.PodeRefazer;
end;

procedure TbrFmPrincipal.OnModeloMudou(Sender: TObject);
begin
  if SemModelo then Exit;
  Modelo := brDM.Visual.Modelo;
  Status.Panels[0].Text := IfThen(Modelo.Mudou, '[Mod]', '');
  Caption := appCaption + '- [' + Modelo.Nome + ']';
  if (Modelo.TipoDeModelo <> tpModeloConceitual) then
  begin
    Tabs.TabIndex := 0;
    Opcoes.ActivePageIndex := 0;
    Tabs.TabDisabled := [1];
  end else Tabs.TabDisabled := [];
end;

procedure TbrFmPrincipal.FormCreate(Sender: TObject);
begin
  ListaDeTrabalho := TStringList.Create;
  if not jaRegistrado('.brM') then
    if Application.MessageBox('Deseja associar a extensão brM aos arquivos do brModelo?'#13'[escreve no registro do sistema operacional]',
      'Associação de extensão de arquivo', MB_YESNO or MB_ICONQUESTION) = mrYes then
    //begin
       RegisterFileType('.brM', 'Arquivo do brModelo', 'extensão do arquivo do brModelo', 'brModelo.exe', 0, true)
    else ShowMessage('Você será consultado novamente na próxima iniciação do brModelo!');
    //end;

  SemModelo := true;

  RegisterClass(TOrigem);
  RegisterClass(TPonto);
  RegisterClass(TLinha);
  RegisterClass(TLigacao);
  RegisterClass(TBase);
  RegisterClass(TEntidade);
  RegisterClass(THintBalao);
  RegisterClass(TConjPAtt);
  RegisterClass(TSelecao);
  RegisterClass(TBaseTexto);
  RegisterClass(TTexto);
  RegisterClass(TCardinalidade);
  RegisterClass(TBaseEntidade);
  RegisterClass(TBaseRelacao);
  RegisterClass(TMaxRelacao);
  RegisterClass(TRelacao);
  RegisterClass(TChildRelacao);
  RegisterClass(TAutoRelacao);
  RegisterClass(TEspecializacao);
  RegisterClass(TEntidadeAssoss);
  RegisterClass(TAtributo);
  RegisterClass(TBarraDeAtributos);
  RegisterClass(TModelo);
  RegisterClass(TTabela);
  RegisterClass(TLigaTabela);
  RegisterClass(TCampo);
//  RegisterClass(TGeralItem);
  RegisterClass(TGeralList);
  RegisterClass(TWriterMsg);
  RegisterClass(TMngTemplate);
  RegisterClass(TMngTemplateItem);
end;

procedure TbrFmPrincipal.arq_fecharExecute(Sender: TObject);
  var i: Integer;
begin
  if SemModelo then Exit;
  if QuerSalvarOModelo(Modelo) = mrCancel then exit;
  brDM.Visual.Fecha;

  Modelo := brDM.Visual.Modelo;
  Status.Panels[0].Text := '';
  if Assigned(Modelo) then
  begin
    AtiveModelo;
  end else
  begin
    Tabs.TabIndex := 0;
    Opcoes.ActivePageIndex := 0;
    Tabs.TabDisabled := [0,1];
    Caption := appCaption + '- []';
  end;

  if brDM.Visual.Modelos.Count = 0 then
  begin
    //autoSalvar.Checked := false;
    SemModelo := true;
    pEditor.Base := nil;
    brDM.Visual.Invalidate;
    for i := 0 to ComponentCount -1 do
    begin
      if (Components[i] is TAction) and (Components[i].Tag <> -2) then
//         (Components[i].Name <> 'arq_novo') and
//         (Components[i].Name <> 'NovoLogico') and
//         (Components[i].Name <> 'sis_sair') and
//         (Components[i].Name <> 'Config') and
//         (Components[i].Name <> 'Sobre') and
////         (Components[i].Name <> 'mod_exibirHint') and
//         (Components[i].Name <> 'arq_abrir') then
      begin
        TAction(Components[i]).Enabled := false;
      end;
    end;
  end;
end;

procedure TbrFmPrincipal.arq_fecharUpdate(Sender: TObject);
begin
  arq_fechar.Enabled := not SemModelo;
end;

procedure TbrFmPrincipal.arq_novoExecute(Sender: TObject);
begin
  CrieNovoModelo(tpModeloConceitual);
end;

procedure TbrFmPrincipal.ModelosSelect(Sender: TObject);
begin
  Modelo := brDM.Visual.SelecioneModelo((Sender as TMenuItem).Tag);
  Tool.Visible := (Modelo.TipoDeModelo = tpModeloConceitual);
  ToolLogica.Visible := not Tool.Visible;
  Caption := appCaption + '- [' + Modelo.Nome + ']';
  if (Modelo.TipoDeModelo = tpModeloLogico) then
  begin
    Tabs.TabIndex := 0;
    Opcoes.ActivePageIndex := 0;
    Tabs.TabDisabled := [1];
    //GerarFisico.Enabled := true;
  end else
  begin
    Tabs.TabDisabled := [];
    //GerarFisico.Enabled := false;
  end;
  OnSelecao(Modelo.Selecionado);
end;

procedure TbrFmPrincipal.arq_abrirExecute(Sender: TObject);
  var M: TModelo;
begin
  brDM.OpenModelo.FilterIndex := 1;
  with brDM.OpenModelo do
    if Execute then
  begin
    if brDM.Visual.JaEstaAberto(FileName) then
    begin
      if Application.MessageBox('O arquivo selecionado já encontra-se aberto!' + #13 +
                                'Deseja abrir mais uma cópia?',
                                'Reabrir arquivo', MB_YESNO or MB_ICONQUESTION or MB_DEFBUTTON2) <> mrYes then exit;
    end;
    if not SemModelo and Modelo.Novo and not Modelo.Mudou then
    begin
      if not brDM.Visual.LoadFromFile(FileName, Modelo.Nome, Modelo) then
      begin
        brDM.Visual.Fecha;
        arq_novoExecute(Self);
      end else
      begin
        brDM.Visual.Modelo.Mudou := false;
        NovoArqCfg(FileName);
      end;
    end else
    begin
      M := brDM.Visual.gera(FileName, false);
      if Assigned(M) then
      begin
        Modelo := M;
        NovoArqCfg(FileName);
      end;
    end;
    Modelo := brDM.Visual.Modelo;
    if not Assigned(Modelo) then exit;
    AtiveModelo;
  end;
end;

Function TbrFmPrincipal.QuerSalvarOModelo(M: TModelo; YtoA: boolean;
  jaYtoA: boolean; jaNtoA: boolean): Integer;
  var tmp: TModelo;
begin
  Result := mrYes;
  if M.Mudou then
  begin
    if jaNtoA then Result := mrNoToAll else
    if jaYtoA then Result := mrYesToAll else
    begin
      if (YtoA) and (brDM.Visual.QtdModeloNaoSalvo > 1) then
        Result := brFmDlgSaveAll.Msg(M.Nome)
      else
        Result := brFmDlgSaveAll.Msg(M.Nome, false);
//        Application.MessageBox(PChar('Deseja salvar as alterações no esquema "' + M.Nome + '"?'), 'Salvar esquema',
//                               MB_YESNOCANCEL or MB_ICONQUESTION or MB_DEFBUTTON1);
    end;
    tmp := Modelo;
    Modelo := M;
    if (Result = mrYes) or (Result = mrYesToAll) then arq_SalvarExecute(nil);
    if (Modelo.Mudou) and ((Result = mrYes) or (Result = mrYesToAll)) then Result := mrCancel;
    Modelo := tmp;
  end;
end;

procedure TbrFmPrincipal.FormCloseQuery(Sender: TObject; var CanClose: Boolean);
  var mr: Word;
begin
  mr := mrNone;
  while brDM.Visual.Modelos.Count > 0 do
  begin
    Modelo := brDM.Visual.SelecioneModelo(brDM.Visual.Modelos.Count -1);
    mr := QuerSalvarOModelo(Modelo, true, (mr = mrYesToAll), (mr = mrNoToAll));
    if mr = mrCancel then
    begin
      CanClose := false;
      AtiveModelo;
      break;
    end;
    brDM.Visual.Fecha;
  end;
  if CanClose then
  begin
    brDM.XMLDoc.XML.Clear;
    with brDM.XMLDoc do
    begin
      XML.Add('<?xml version="1.0" encoding="ISO-8859-1"?>');
      XML.Add('<APP>');
      XML.Add('<CONFIGURACAO>');
      XML.Add('</CONFIGURACAO>');
      XML.Add('<AJUDA>');
      XML.Add('</AJUDA>');
      XML.Add('</APP>');
    end;
    try
      brDM.XMLDoc.Active := true;
      Conf.SaveToXml(brDM.XMLDoc.DocumentElement.ChildNodes);
      brDM.XMLDoc.SaveToFile(Conf.cfgFile);
    except
      onErro(nil, 'Não foi possível salvar o arquivo de configuração!' + #13 +
                  'Arquivo: ' + Conf.cfgFile, 0);
    end;
  end;
end;

procedure TbrFmPrincipal.modExportBMPExecute(Sender: TObject);
 var bkp: Boolean;
begin
  if SemModelo then Exit;
  bkp := Modelo.Mudou;
  Modelo.EveryHideShowSelection(nil, false);
  Modelo.BaseHint.Visible := false;
  try
    brFmImpress.Maker.make(Modelo);
    if (Sender as TComponent).Name = 'modExportBMP' then
      brFmImpress.ExBMPExecute(nil)
        else brFmImpress.ExMExecute(nil);
    //brFmImpress.ShowModal;
  except
    onErro(nil, 'O Sistema Operacional não conseguiu gerar a página de impressão/exportação!', 0);
  end;
  Modelo.EveryHideShowSelection(nil, true);
  brFmImpress.Maker.Imagem.Picture := nil;
  Modelo.Mudou := bkp;
  Modelo.Invalidate;
end;

procedure TbrFmPrincipal.mod_exibirHintExecute(Sender: TObject);
begin
//não é necessário código
end;

procedure TbrFmPrincipal.AtiveModelo;
  var i: integer;
begin
  SemModelo := false;
  Modelo.AtualizaQtdItens;
  Status.Panels[0].Text := IfThen(Modelo.Mudou, '[Mod]', '');
  for i := 0 to ComponentCount -1 do
  begin
    if (Components[i] is TAction) then
    begin
      TAction(Components[i]).Enabled := True;
    end;
  end;
  OnSelecao(Modelo.Selecionado);
  Tool.Visible := (Modelo.TipoDeModelo = tpModeloConceitual);
  ToolLogica.Visible := not Tool.Visible;
  if (Modelo.TipoDeModelo = tpModeloLogico) then
  begin
    Tabs.TabIndex := 0;
    Opcoes.ActivePageIndex := 0;
    Tabs.TabDisabled := [1];
  end else Tabs.TabDisabled := [];

  if Modelo.Selecionado = nil then RealizeChecagem;
  Caption := appCaption + '- [' + Modelo.Nome + ']';
  //autoSalvar.Checked := Modelo.AutoSalvar;
end;

procedure TbrFmPrincipal.edt_pasteExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  if not brDM.Visual.Focused then Exit;
  Modelo.Colar;
end;

procedure TbrFmPrincipal.edt_RefazerExecute(Sender: TObject);
begin
  if not brDM.Visual.Memoria.Refazer then
  Application.MessageBox('Impossível refazer', 'Impossível refazer', MB_OK or MB_ICONWARNING)
  else Modelo.Ferramenta := Tool_Nothing;
end;

procedure TbrFmPrincipal.edt_RefazerHint(var HintStr: string; var CanShow: Boolean);
begin
  HintStr := 'Refazer [' + brDM.Visual.Memoria.StrQtdRefazer + ']';
end;

procedure TbrFmPrincipal.StatusDrawPanel(StatusBar: TStatusBar;  //gaugue onload MER.
  Panel: TStatusPanel; const Rect: TRect);
  var Rec, R: TRect;
      txt: String;
      P: integer;
begin
  txt := copy(Status.Panels[4].Text, 1, Length(Status.Panels[4].Text) -1);
  if (txt <> '') and (txt <> '-1') then
  begin
    P := StrToInt(txt);
    StatusBar.Canvas.Font.Style := [fsBold];
    StatusBar.Canvas.Brush.Color := clBlue;
    StatusBar.Canvas.Brush.Style := bsSolid;
    rec.Left := Rect.Left;
    rec.Top := Rect.Top +3;
    rec.Bottom := Rect.Bottom -3;
    rec.Right := Rect.Left + ((Rect.Right -Rect.Left) * P div 100);
    StatusBar.Canvas.FillRect(Rec);
    txt := Status.Panels[4].Text;
    R := Rect;
    StatusBar.Canvas.Brush.Style := bsClear;
    StatusBar.Canvas.Font.Color := clGray;
    DrawText(StatusBar.Canvas.Handle, PChar(Txt), -1, R, DT_CENTER or DT_EXPANDTABS);
  end;
end;

procedure TbrFmPrincipal.OnLoadProgress(Porcentagem: Integer);  //do modelo.
begin
  Status.Panels[4].Text := IntToStr(Porcentagem) + '%';
  Status.Repaint;
//  Update;
end;

procedure TbrFmPrincipal.Todos_modelosExecute(Sender: TObject);
begin
  if SemModelo then
    Application.MessageBox('Não há nenhum esquema aberto!', 'Esquemas', mb_Ok or MB_ICONEXCLAMATION)
  else
    Application.MessageBox(PChar('Esquema selecionado:' + #13 + Modelo.Nome + #13 + Modelo.Arquivo), 'Esquemas', mb_Ok or MB_ICONEXCLAMATION);
end;

procedure TbrFmPrincipal.Todos_objetosExecute(Sender: TObject);
begin
  Box.HorzScrollBar.Position := 0;
  Box.VertScrollBar.Position := 0;
end;

procedure TbrFmPrincipal.MenuObjetosPopup(Sender: TObject);
  var i: integer;
    M: TMenuItem;
    IT: TGeralItem;
begin
  MenuObjetos.Items.Clear;
  if SemModelo then Exit;
  Modelo.GetItens(ListaDeObj);
  for i := 0 to ListaDeObj.Lista.Count -1 do
  begin
    M := TMenuItem.Create(MenuObjetos);
    It := ListaDeObj[I];
    M.Caption := IT.Texto;
    M.Tag := IT.Index;
    M.ImageIndex := IT.Tag;
    M.OnClick := Navega;
    MenuObjetos.Items.Add(M);
  end;
end;

procedure TbrFmPrincipal.MenuModelosPopup(Sender: TObject);
  var i, j: integer;
    M: TMenuItem;
begin
  brDM.Visual.GetModelos(ListaDeMer);
  MenuModelos.Items.Clear;
  j := brDM.Visual.Modelos.IndexOf(Modelo);
  for i := 0 to ListaDeMer.Lista.Count -1 do
  begin
    M := TMenuItem.Create(MenuModelos);
    M.Caption := ListaDeMer[I].Texto;
    M.Tag := ListaDeMer[I].Index;
    M.OnClick := ModelosSelect;
    if (j = M.Tag) then M.ImageIndex := 1 else M.ImageIndex := 0;
    MenuModelos.Items.Add(M);
  end;
end;

procedure TbrFmPrincipal.Navega(Sender: TObject);
  var B: Tbase;
begin
  if SemModelo then Exit;
  B := Modelo.FindByID((Sender as TMenuItem).Tag);
  if not Assigned(B) then exit;
  Box.HorzScrollBar.Position := 20 + B.Left;
  Box.VertScrollBar.Position := 20 + B.Top;
  Modelo.Selecionado := B;
end;

procedure TbrFmPrincipal.editarDicExecute(Sender: TObject);
begin
  if SemModelo or (Modelo.Selecionado = nil) then Exit;
  if Modelo.Selecionado is TCampo then
    if TCampo(Modelo.Selecionado).ApenasSeparador then Exit;
//  if Modelo.ModeloLogico then Exit;
  brFmDic := TbrFmDic.Create(nil);
  brFmDic.Dicionario.Lines.Text := Modelo.Selecionado.Dicionario;
  brFmDic.nomeObj.Caption := Denominar(Modelo.Selecionado.ClassName) + ': ' + Modelo.Selecionado.Nome;
  if brFmDic.ShowModal = mrOk then
  begin
    Modelo.Selecionado.Dicionario := StringReplace(brFmDic.Dicionario.Lines.Text, #13#10, #13, [rfReplaceAll]);
  end;
  brFmDic.Free;
end;

procedure TbrFmPrincipal.covToRestExecute(Sender: TObject);
begin
  if SemModelo or not (Modelo.Selecionado is TEspecializacao) then Exit;
  if not TEspecializacao(Modelo.Selecionado).ConverteEspToRestrita then
  onErro(nil, 'Operação não realizável!', 0);
end;

procedure TbrFmPrincipal.convToOpcExecute(Sender: TObject);
begin
  if SemModelo or not (Modelo.Selecionado is TEspecializacao) then Exit;
  if not TEspecializacao(Modelo.Selecionado).OpcionalizeEsp then
  onErro(nil, 'Operação não realizável!', 0);
end;

procedure TbrFmPrincipal.dicFullExecute(Sender: TObject);
begin
  with TbrFmDicFull.Create(nil) do
  begin
    Maker;
    ShowModal;
    free;
  end;
end;

procedure TbrFmPrincipal.SobreExecute(Sender: TObject);
begin
  with uSobre.TbrFmSobre.Create(nil) do
  begin
    ShowModal;
    free;
  end;
end;

procedure TbrFmPrincipal.LCriar_campoUpdate(Sender: TObject);
begin
  if SemModelo then Exit;
  (Sender as TAction).Enabled := Modelo.QtdTabela > 0;
end;

procedure TbrFmPrincipal.LCriar_RelacaoUpdate(Sender: TObject);
begin
  if SemModelo then Exit;
  (Sender as TAction).Enabled := Modelo.QtdTabela > 1;
end;

procedure TbrFmPrincipal.criar_EntidadeUpdate(Sender: TObject);
begin
  if SemModelo then Exit;
  LCriar_tabela.Enabled := (Modelo.TipoDeModelo = tpModeloLogico);
  if (Sender as TAction) <> LCriar_tabela then
  (Sender as TAction).Enabled := not LCriar_tabela.Enabled;
  addXSLT.Enabled := LCriar_tabela.Enabled;
  GerarFisico.Enabled := LCriar_tabela.Enabled;
  fisicoTemplate.Enabled := LCriar_tabela.Enabled;
end;

procedure TbrFmPrincipal.editarDicUpdate(Sender: TObject);
begin
  if SemModelo then Exit;
  editarDic.Enabled :=
    (Modelo.TipoDeModelo = tpModeloConceitual) and (Modelo.Selecionado <> nil) and not(Modelo.Selecionado is TTexto);
  editarDicL.Enabled :=
    (Modelo.TipoDeModelo = tpModeloLogico) and (Modelo.Selecionado <> nil) and not(Modelo.Selecionado is TTexto);
end;

procedure TbrFmPrincipal.exp_LogicoExecute(Sender: TObject);
begin
  Modelo := brDM.Visual.ExportarParaLogico(Modelo);
  AtiveModelo;
end;

procedure TbrFmPrincipal.NovoLogicoExecute(Sender: TObject);
begin
  CrieNovoModelo(tpModeloLogico);
end;

procedure TbrFmPrincipal.exp_LogicoUpdate(Sender: TObject);
begin
  if SemModelo then exit;
  exp_Logico.Enabled := (Modelo.TipoDeModelo = tpModeloConceitual) and (Modelo.QtdBase > 0);
  mod_exibirHint.Enabled := (Modelo.TipoDeModelo = tpModeloConceitual);
end;

procedure TbrFmPrincipal.fisicoTemplateExecute(Sender: TObject);
begin
  if SemModelo then exit;
  with TbrFmTmplFisico.Create(Self) do
  begin
    ModeloAtivo := Modelo;
    ShowModal;
    Free;
  end;
  OnSelecao(nil);
  OnSelecao(Modelo.Selecionado);
end;

procedure TbrFmPrincipal.Questao(TextoA, TextoB: string; topico_ajuda: integer;
  var ResultadoSugestao: Integer);
  var res: Word;
begin
  res := mrNo;
  brFmQuestao.Ajuda := topico_ajuda;
  brFmQuestao.Texto2.Items.Text := TextoB;
  brFmQuestao.Texto2.Height := 25 * brFmQuestao.Texto2.Items.Count + 5;
  brFmQuestao.Texto2.ItemIndex := ResultadoSugestao;
  brFmQuestao.Texto1.Caption := TextoA;
  if brFmQuestao.ShowModal <> mrOk then
  begin
    while true do
    begin
      res := Application.MessageBox('Cancelar conversão?', 'Cancelar operação', MB_YESNO or MB_ICONQUESTION);
      if res = mrYes then break
        else
          if brFmQuestao.ShowModal = mrOk then break;
    end;
  end;
  if (res = mrYes) then
  begin
    ResultadoSugestao := -1;
    exit;
  end;
  ResultadoSugestao := brFmQuestao.Texto2.ItemIndex;
end;

procedure TbrFmPrincipal.FormDestroy(Sender: TObject);
  var i: integer;
begin
  try
    for i:= 0 to AjudaArquivos.Count -1 do
    begin
      DeleteFile(AjudaArquivos[I]);
    end;
    AjudaArquivos.Free;
  except
  end;
  ListaDeTrabalho.Free;
//  ReportMemoryLeaksOnShutdown := DebugHook <> 0;
end;

procedure TbrFmPrincipal.GerarFisicoExecute(Sender: TObject);
begin
  Modelo.Template.ApureToConvert;
  with TbrFmFisico.Create(nil) do
  begin
    ShowModal;
    Free;
  end;
  Modelo.Template.RessetToNormal;
  OnSelecao(nil);
  OnSelecao(Modelo.Selecionado);
end;

procedure TbrFmPrincipal.verLogsExecute(Sender: TObject);
begin
  Util.Visible := verLogs.Checked;
  Conf.ExibirLog := verLogs.Checked;
  if verLogs.Checked then SplitterFDP.Top := Util.Top -1;
end;

procedure TbrFmPrincipal.limpar_logsExecute(Sender: TObject);
begin
  Util.Clear;
end;

procedure TbrFmPrincipal.salva_logsExecute(Sender: TObject);
begin
  brDM.SavaDic.FileName := 'logs' + FormatDateTime('DD.MM.YYYY.hh.mm', now) + '.log';
  with brDM.SavaDic do
    if Execute then
  begin
    try
      Util.Lines.SaveToFile(FileName);
//      DM.Visual.Writer.write('Logs salvos em arquivo ['+ FileName +'].', false, true);
    except
      on exception do onErro(nil, 'Não foi possível salvar os logs em!' + #13 +
                             '[' + FileName + '].', 0);
    end;
  end;
end;

procedure TbrFmPrincipal.BaseBeginUpdate(Sender: TObject);
begin
  if (Sender is TModelo) then Exit;
  Modelo.EveryHideShowSelection(nil, false);
end;

procedure TbrFmPrincipal.BaseEndUpdate(Sender: TObject);
begin
  if (Sender is TModelo) then Exit;
  Modelo.EveryHideShowSelection(nil, true);
  Modelo.EndOperation;
  if (Sender = nil) then
    Modelo.erro(Modelo.Selecionado, 'Erro ao alterar o valor da propriedade do objeto!', 0);
end;

procedure TbrFmPrincipal.BoxMouseWheelDown(Sender: TObject; Shift: TShiftState;
  MousePos: TPoint; var Handled: Boolean);
  var scrH, scrW, LargBar: Integer;
  pt: TPoint;
begin
  if PtInRect(BoundsRect, MousePos) and not(Handled) then
  with box do
  begin
    pt := Box.ClientToScreen(point(Box.Top + Box.Height, Box.Left + Box.Width));
    scrH := pt.X;
    scrW := pt.Y;
    LargBar := GetSystemMetrics(SM_CXVSCROLL);
    if (MousePos.X < (scrW - LargBar)) and
       ((MousePos.Y > (scrH - LargBar)) and (MousePos.Y < scrH)) then
      HorzScrollBar.Position := HorzScrollBar.Position + HorzScrollBar.Increment
    else
      VertScrollBar.Position := VertScrollBar.Position + VertScrollBar.Increment;
    Handled := true;
  end;
end;

procedure TbrFmPrincipal.BoxMouseWheelUp(Sender: TObject; Shift: TShiftState;
  MousePos: TPoint; var Handled: Boolean);
  var scrH, scrW, LargBar: Integer;
  pt: TPoint;
begin
  if PtInRect(BoundsRect, MousePos) and not(Handled) then
  with box do
  begin
    pt := Box.ClientToScreen(point(Box.Top + Box.Height, Box.Left + Box.Width));
    scrH := pt.X;
    scrW := pt.Y;
    LargBar := GetSystemMetrics(SM_CXVSCROLL);
    if (MousePos.X < (scrW - LargBar)) and
       ((MousePos.Y > (scrH - LargBar)) and (MousePos.Y < scrH)) then
      HorzScrollBar.Position := HorzScrollBar.Position - HorzScrollBar.Increment
    else
      VertScrollBar.Position := VertScrollBar.Position - VertScrollBar.Increment;
    Handled := true;
  end;
end;

procedure TbrFmPrincipal.autoSalvarExecute(Sender: TObject);
begin
  if SemModelo then exit;
  if not Modelo.AutoSalvar then
  begin
    if Modelo.Novo then arq_salvarcExecute(Sender);
    Modelo.AutoSalvar := not Modelo.Novo;
  end else Modelo.AutoSalvar := false;
  autoSalvar.Checked := Modelo.AutoSalvar;
end;

procedure TbrFmPrincipal.autoSalvarUpdate(Sender: TObject);
begin
  if SemModelo then autoSalvar.Enabled := false else
  begin
    autoSalvar.Enabled := True;
    autoSalvar.Checked := Modelo.AutoSalvar;
  end;
end;

procedure TbrFmPrincipal.TimerAutoSavaTimer(Sender: TObject);
  var M: TModelo;
  i: integer;
begin
  for i := 0 to brDM.Visual.Modelos.Count -1 do
  begin
    M := TModelo(brDM.Visual.Modelos[i]);
    if M.AutoSalvar and M.Mudou and (not M.Salvar) then
    begin
      onErro(nil, 'Não foi possível salvar o esquema "' + M.Nome + '".' + #13 +
             'O auto-salvamento do esquema foi desativado.', 1);
      M.AutoSalvar := false;
    end;
  end;
end;

procedure TbrFmPrincipal.cfgExecute(Sender: TObject);
  var i: integer;
  oldH: boolean;
begin
  brFmCfg.PageControl1.ActivePageIndex := 0;
  brFmCfg.dirLogico.Text := Conf.dirLogico;
  brFmCfg.dirConceitual.Text := Conf.dirConceitual;
  brFmCfg.SpinEdit1.Value := Conf.Tempo;
  oldH := mod_exibirHint.Checked;
  if brFmCfg.ShowModal = mrOK then
  begin
    for i := 1 to 5 do
    begin
      if i <= brFmCfg.arquivos.Items.Count then
        Conf.Arq[i] := brFmCfg.arquivos.Items.Strings[i -1]
      else Conf.Arq[i] := '';
    end;
    Conf.showLHint := mod_exibirHint.Checked;
    Conf.dirLogico := brFmCfg.dirLogico.Text;
    Conf.dirConceitual := brFmCfg.dirConceitual.Text;
    Conf.Tempo := brFmCfg.SpinEdit1.Value;
    RefreshCfg;
  end else
  begin
    mod_exibirHint.Checked := oldH;
    brFmCfg.arquivos.Items.Clear;
    for i := 1 to 5 do
    begin
      if Conf.arq[i] <> '' then
      brFmCfg.arquivos.Items.Add(Conf.arq[i]);
    end;
  end;
end;

procedure TbrFmPrincipal.act1Execute(Sender: TObject);
  var fileName: String;
      M: TModelo;
begin
  fileName := (Sender as TAction).Hint;
  if not FileExists(fileName) then
  begin
    onErro(nil, 'Não foi possível encontrar o arquivo.' + #13 + 'Arquivo: ' + fileName, 0);
    exit;
  end;

  if not SemModelo and Modelo.Novo and not Modelo.Mudou then
  begin
    if not brDM.Visual.LoadFromFile(FileName, Modelo.Nome, Modelo) then
    begin
      brDM.Visual.Fecha;
      arq_novoExecute(Self);
    end else
    begin
      brDM.Visual.Modelo.Mudou := false;
      NovoArqCfg(FileName);
    end;
  end else
  begin
    M := brDM.Visual.gera(FileName, false);
    if Assigned(M) then
    begin
      Modelo := M;
      NovoArqCfg(FileName);
    end;
  end;
  Modelo := brDM.Visual.Modelo;
  if Assigned(Modelo) then AtiveModelo;
end;

procedure TbrFmPrincipal.act1Update(Sender: TObject);
  var A: TAction;
begin
  A := (Sender as TAction);
  A.Visible := (A.Caption <> '');
  A.Enabled := not brDM.Visual.ModeloFindByArq(A.Hint);
end;

procedure TbrFmPrincipal.RefreshCfg;
begin
  Conf.refreshArq;
  if TimerAutoSava.Interval <> (Conf.Tempo * 60000) then TimerAutoSava.Interval := (Conf.Tempo * 60000);
end;

procedure TbrFmPrincipal.NovoArqCfg(FileName: String);
  var i: integer;
begin
  brFmCfg.addArquivo(FileName);
  for i:= 1 to 5 do
  begin
    if i <= brFmCfg.arquivos.Items.Count then
      Conf.Arq[i] := brFmCfg.arquivos.Items.Strings[i -1]
    else Conf.Arq[i] := '';
  end;
  Conf.refreshArq;
end;

procedure TbrFmPrincipal.xsl_makerExecute(Sender: TObject);
begin
  brFmVisuXSLT := TbrFmVisuXSLT.Create(nil);
  brFmVisuXSLT.PageControl1.ActivePageIndex := 0;
  if (Modelo <> nil) and (FileExists(Modelo.Arquivo))
     and (AnsiUpperCase(ExtractFileExt(Modelo.Arquivo)) = '.XML')
       then brFmVisuXSLT.arq.Text := Modelo.Arquivo else brFmVisuXSLT.arq.Text := '';
  brFmVisuXSLT.showModal;
  brFmVisuXSLT.Free;
end;

procedure TbrFmPrincipal.SplitterFDPCanResize(Sender: TObject; var NewSize: Integer;
  var Accept: Boolean);
begin
  Accept := (NewSize < 200) AND (NewSize > 15);
end;

procedure TbrFmPrincipal.selAttExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  if (Modelo.Selecionado <> nil) and (Modelo.TipoDeModelo = tpModeloConceitual) then Modelo.SelecioneSelecionadosAtributos;
end;

procedure TbrFmPrincipal.ModeloOpcPopup(Sender: TObject);
begin
  if SemModelo then Exit;
//  for i:= 3 to 4 do
//  begin
//    TMenuItem(ModeloOpc.Items[i]).Visible := (Modelo.TipoDeModelo = tpModeloConceitual);
//  end;
  TMenuItem(ModeloOpc.Items[0]).Visible := Modelo.Selecionado is TAtributo;
  TMenuItem(ModeloOpc.Items[1]).Visible := Modelo.Selecionado is TEntidade;
  TMenuItem(ModeloOpc.Items[2]).Visible := TMenuItem(ModeloOpc.Items[1]).Visible;
  TMenuItem(ModeloOpc.Items[3]).Visible := (Modelo.TipoDeModelo = tpModeloConceitual);
  TMenuItem(ModeloOpc.Items[4]).Visible := (Modelo.TipoDeModelo = tpModeloLogico);
end;

procedure TbrFmPrincipal.addXSLTExecute(Sender: TObject);
begin
  if SemModelo then Exit;
  brFmInsXSL := TbrFmInsXSL.Create(nil);
  brFmInsXSL.XSL.DefaultXsl := Modelo.Xsl;
  brFmInsXSL.ShowModal;
  Modelo.Xsl := brFmInsXSL.XSL.XSL;
  brFmInsXSL.Free;
end;

procedure TbrFmPrincipal.aj_siteExecute(Sender: TObject);
begin
  brExecute('http://www.sis4.com/brmodelo/');
end;

end.

