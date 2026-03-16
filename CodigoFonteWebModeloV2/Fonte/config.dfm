object brFmCfg: TbrFmCfg
  Left = 350
  Top = 210
  BorderStyle = bsDialog
  Caption = 'Configura'#231#245'es'
  ClientHeight = 217
  ClientWidth = 459
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  FormStyle = fsStayOnTop
  OldCreateOrder = False
  Position = poMainFormCenter
  PixelsPerInch = 96
  TextHeight = 13
  object Janela: TPanel
    Left = 0
    Top = 0
    Width = 459
    Height = 217
    Align = alClient
    BevelWidth = 3
    DragKind = dkDock
    TabOrder = 0
    object Panel4: TPanel
      Left = 3
      Top = 3
      Width = 453
      Height = 24
      Align = alTop
      BevelOuter = bvLowered
      BorderWidth = 1
      Caption = 'Configura'#231#245'es do sistema'
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clWindowText
      Font.Height = -13
      Font.Name = 'MS Sans Serif'
      Font.Style = [fsBold]
      ParentFont = False
      TabOrder = 0
    end
    object PageControl1: TPageControl
      Left = 3
      Top = 27
      Width = 453
      Height = 159
      ActivePage = TabSheet1
      Align = alClient
      TabOrder = 1
      TabWidth = 100
      object TabSheet1: TTabSheet
        Caption = 'Menu Reabrir'
        object GroupBox1: TGroupBox
          Left = 0
          Top = 0
          Width = 445
          Height = 131
          Align = alClient
          Caption = 'Arquivos do menu reabrir'
          TabOrder = 0
          object Panel1: TPanel
            Left = 368
            Top = 15
            Width = 75
            Height = 114
            Align = alRight
            TabOrder = 0
            object SpeedButton1: TSpeedButton
              Left = 3
              Top = 87
              Width = 70
              Height = 22
              Caption = 'Excluir'
              OnClick = SpeedButton1Click
            end
            object addArq: TSpeedButton
              Left = 3
              Top = 64
              Width = 70
              Height = 22
              Caption = 'Adicionar'
              OnClick = addArqClick
            end
            object SpinButton1: TSpinButton
              Left = 1
              Top = 1
              Width = 73
              Height = 32
              Align = alTop
              DownGlyph.Data = {
                0E010000424D0E01000000000000360000002800000009000000060000000100
                200000000000D800000000000000000000000000000000000000008080000080
                8000008080000080800000808000008080000080800000808000008080000080
                8000008080000080800000808000000000000080800000808000008080000080
                8000008080000080800000808000000000000000000000000000008080000080
                8000008080000080800000808000000000000000000000000000000000000000
                0000008080000080800000808000000000000000000000000000000000000000
                0000000000000000000000808000008080000080800000808000008080000080
                800000808000008080000080800000808000}
              TabOrder = 0
              UpGlyph.Data = {
                0E010000424D0E01000000000000360000002800000009000000060000000100
                200000000000D800000000000000000000000000000000000000008080000080
                8000008080000080800000808000008080000080800000808000008080000080
                8000000000000000000000000000000000000000000000000000000000000080
                8000008080000080800000000000000000000000000000000000000000000080
                8000008080000080800000808000008080000000000000000000000000000080
                8000008080000080800000808000008080000080800000808000000000000080
                8000008080000080800000808000008080000080800000808000008080000080
                800000808000008080000080800000808000}
              OnDownClick = SpinButton1DownClick
              OnUpClick = SpinButton1UpClick
            end
          end
          object arquivos: TListBox
            Left = 2
            Top = 15
            Width = 366
            Height = 114
            Align = alClient
            ItemHeight = 13
            TabOrder = 1
          end
        end
      end
      object TabSheet2: TTabSheet
        Caption = 'Auto Salvamento'
        ImageIndex = 1
        object Label2: TLabel
          Left = 8
          Top = 16
          Width = 295
          Height = 13
          Caption = 'Tempo para o salvamento autom'#225'tico do modelo (em minutos):'
        end
        object SpinEdit1: TSpinEdit
          Left = 312
          Top = 12
          Width = 49
          Height = 22
          MaxValue = 60
          MinValue = 1
          TabOrder = 0
          Value = 5
        end
      end
      object TabSheet3: TTabSheet
        Caption = 'Diret'#243'rios'
        ImageIndex = 2
        object Label1: TLabel
          Left = 16
          Top = 24
          Width = 189
          Height = 13
          Caption = 'Diret'#243'rio para salvar os modelos l'#243'gicos:'
        end
        object SpeedButton2: TSpeedButton
          Left = 384
          Top = 40
          Width = 23
          Height = 22
          Caption = '...'
          OnClick = SpeedButton3Click
        end
        object Label3: TLabel
          Left = 16
          Top = 72
          Width = 210
          Height = 13
          Caption = 'Diret'#243'rio para salvar os modelos conceituais:'
        end
        object SpeedButton3: TSpeedButton
          Tag = 1
          Left = 384
          Top = 88
          Width = 23
          Height = 22
          Caption = '...'
          OnClick = SpeedButton3Click
        end
        object dirLogico: TEdit
          Left = 15
          Top = 41
          Width = 362
          Height = 21
          TabOrder = 0
        end
        object dirConceitual: TEdit
          Left = 15
          Top = 89
          Width = 362
          Height = 21
          TabOrder = 1
        end
      end
      object TabSheet4: TTabSheet
        Caption = 'Atributo oculto'
        ImageIndex = 3
        object Label4: TLabel
          Left = 8
          Top = 32
          Width = 150
          Height = 13
          Caption = 'Obs: Apenas modelo conceitual'
        end
        object CheckBox1: TCheckBox
          Left = 8
          Top = 9
          Width = 409
          Height = 17
          Action = brFmPrincipal.mod_exibirHint
          TabOrder = 0
        end
      end
    end
    object Panel2: TPanel
      Left = 3
      Top = 186
      Width = 453
      Height = 28
      Align = alBottom
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clWindowText
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = [fsBold]
      ParentFont = False
      TabOrder = 2
      object Button1: TButton
        Left = 303
        Top = 4
        Width = 70
        Height = 20
        Caption = 'Cancelar'
        ModalResult = 2
        TabOrder = 0
      end
      object Button2: TButton
        Left = 379
        Top = 4
        Width = 70
        Height = 20
        Caption = 'Pronto'
        Default = True
        ModalResult = 1
        TabOrder = 1
      end
    end
  end
end
