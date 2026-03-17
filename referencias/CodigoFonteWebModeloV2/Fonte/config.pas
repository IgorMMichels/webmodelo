unit config;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ComCtrls, ToolWin, StdCtrls, ExtCtrls, Buttons, Spin, filectrl;

type
  TbrFmCfg = class(TForm)
    Janela: TPanel;
    Panel4: TPanel;
    PageControl1: TPageControl;
    TabSheet1: TTabSheet;
    GroupBox1: TGroupBox;
    Panel1: TPanel;
    SpeedButton1: TSpeedButton;
    addArq: TSpeedButton;
    SpinButton1: TSpinButton;
    arquivos: TListBox;
    TabSheet2: TTabSheet;
    SpinEdit1: TSpinEdit;
    TabSheet3: TTabSheet;
    TabSheet4: TTabSheet;
    CheckBox1: TCheckBox;
    Label2: TLabel;
    dirLogico: TEdit;
    Label1: TLabel;
    SpeedButton2: TSpeedButton;
    Label3: TLabel;
    dirConceitual: TEdit;
    SpeedButton3: TSpeedButton;
    Panel2: TPanel;
    Button1: TButton;
    Button2: TButton;
    Label4: TLabel;
    procedure addArqClick(Sender: TObject);
    procedure SpinButton1DownClick(Sender: TObject);
    procedure SpinButton1UpClick(Sender: TObject);
    procedure SpeedButton3Click(Sender: TObject);
    procedure SpeedButton1Click(Sender: TObject);
  private
    { Private declarations }
  public
    procedure addArquivo(arq: string);
    { Public declarations }
  end;

var
  brFmCfg: TbrFmCfg;

implementation

uses uApp, uDM;

{$R *.dfm}

procedure TbrFmCfg.addArqClick(Sender: TObject);
begin
  with brDM.OpenXML do
    if Execute then
  begin
    addArquivo(FileName);
  end;
end;

procedure TbrFmCfg.addArquivo(arq: string);
begin
  arq := AnsiUpperCase(Trim(arq));
  with arquivos.Items do
  if IndexOf(arq) < 0 then
  begin
    Insert(0, arq);
    if Count > 5 then Delete(5);
  end else Move(IndexOf(arq), 0);
end;

procedure TbrFmCfg.SpinButton1DownClick(Sender: TObject);
  var i: integer;
begin
  if (arquivos.ItemIndex > -1) and (arquivos.Count > 1) then
  with arquivos do
  begin
    if ItemIndex = (items.Count -1) then i := 0 else i := ItemIndex + 1;
    Items.Move(ItemIndex, I);
    ItemIndex := i;
  end;
end;

procedure TbrFmCfg.SpinButton1UpClick(Sender: TObject);
  var i: integer;
begin
  if (arquivos.ItemIndex > -1) and (arquivos.Count > 1) then
  with arquivos do
  begin
    if ItemIndex = 0 then i := (items.Count -1) else i := ItemIndex - 1;
    Items.Move(ItemIndex, I);
    ItemIndex := i;
  end;
end;

procedure TbrFmCfg.SpeedButton3Click(Sender: TObject);
  var s: string;
begin
  if SelectDirectory('Selecione o Diretório', '', S) then
  begin
    if (Sender as TSpeedButton).Tag = 0 then dirLogico.Text := S else
    dirConceitual.Text := S;
  end;
end;

procedure TbrFmCfg.SpeedButton1Click(Sender: TObject);
begin
  arquivos.DeleteSelected;
end;

end.
