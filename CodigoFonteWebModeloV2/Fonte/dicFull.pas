unit dicFull;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ComCtrls, ActnList, XPStyleActnCtrls, ActnMan, ToolWin, StdCtrls,
  ExtCtrls;

type
  TbrFmDicFull = class(TForm)
    Dicionario: TRichEdit;
    ToolBar1: TToolBar;
    StatusBar1: TStatusBar;
    ActionManager1: TActionManager;
    Fechar: TAction;
    Salvar: TAction;
    Imprimir: TAction;
    ToolButton1: TToolButton;
    ToolButton2: TToolButton;
    ToolButton3: TToolButton;
    ToolButton4: TToolButton;
    Panel1: TPanel;
    procedure FecharExecute(Sender: TObject);
    procedure SalvarExecute(Sender: TObject);
    procedure ImprimirExecute(Sender: TObject);
  private
    { Private declarations }
  public
    Procedure Maker;
    { Public declarations }
  end;

var
  brFmDicFull: TbrFmDicFull;

implementation

uses uDM, DateUtils, uAux, mer;

{$R *.dfm}

procedure TbrFmDicFull.FecharExecute(Sender: TObject);
begin
  close;
end;

procedure TbrFmDicFull.SalvarExecute(Sender: TObject);
begin
  if brDM.Visual.Modelos.Count = 0 then Exit;
  brDM.SavaDic.FileName := brDM.Visual.Modelo.Nome;
  with brDM.SavaDic do
    if Execute then
  begin
    try
      Dicionario.Lines.SaveToFile(FileName);
    except
//      on exception do
      Application.MessageBox(PChar('Não foi possível salvar o dicionário para o arquivo selecionado!' + #13 +
      '[' + FileName + '].'), 'Erro: dicionário de dados', mb_Ok or MB_ICONERROR);
    end;
  end;
end;

procedure TbrFmDicFull.ImprimirExecute(Sender: TObject);
begin
  with brDM.PrintDialog do
  if Execute then Dicionario.Print('[Dicionário de dados]');
end;

procedure TbrFmDicFull.Maker;
  var Lst: TGeralList;
      I: integer;
begin
  if brDM.Visual.Modelos.Count = 0 then Exit;
  Lst := TGeralList.Create(nil);
  Dicionario.Lines.Clear;
  try
    brDM.Visual.Modelo.GetItens(Lst);
    for i := 0 to Lst.Lista.Count -1 do
    begin
      Dicionario.SelAttributes.Color := clBlue;
      Dicionario.SelAttributes.Style := [FsBold];
      Dicionario.Lines.Add(FormatFloat('000', i + 1) + ' - ' + Denominar(Lst[i].Referencia.ClassName) + ': ' + Lst[i].Texto);

      Dicionario.SelStart := Length(Dicionario.Text) - Length(Lst[i].Texto) -2;
      Dicionario.SelLength := Length(Lst[i].Texto);
      Dicionario.SelAttributes.Color := clTeal;

      Dicionario.SelAttributes.Color := clBlack;
      Dicionario.SelAttributes.Style := [];
      if TBase(Lst[i].Referencia).Dicionario <> '' then
        Dicionario.Lines.Add(TBase(Lst[i].Referencia).Dicionario);
      Dicionario.Lines.Add('');
    end;
  finally
    Lst.Free;
  end;
end;

end.
