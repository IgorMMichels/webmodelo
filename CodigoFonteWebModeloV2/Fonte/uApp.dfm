object brFmPrincipal: TbrFmPrincipal
  Left = 206
  Top = 130
  Caption = 'brModelo'
  ClientHeight = 536
  ClientWidth = 800
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  Icon.Data = {
    0000010001002020100000000000E80200001600000028000000200000004000
    0000010004000000000080020000000000000000000000000000000000000000
    000000008000008000000080800080000000800080008080000080808000C0C0
    C0000000FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF000000
    0000000000000000000000000000000000000000000000000000000000000000
    0000000000000000000000000000000000000000000000000000000000000000
    0000000000000000000000000000000000000000000000000000000000000000
    0000000000000000000000000000000000000000000000000000000000000000
    0000000000000000000000000000000000000000000000000000000000000000
    00000000000000000000000000000000A0000000000000000AAAAAAAAA00000A
    AA000000000000000AAAAAAAAA0000AAAAA00000000000000AAAAAAAAA00000A
    AA000000000000000AAAAAAAAA000000A0000000000000000000000000000000
    0000000000000000000000000000000000000000000000000000000000000000
    0000000000000000000000000000000000000000000000000000000000000000
    0000000000000000000000000000000000000000000000000000000000000000
    0000000000000000000000000000000000000000000000000000000000000000
    0000000000000000000000A000000AAAAAAAA0000000000000000AAA00000AAA
    AAAAA000000000000000AAAAA0000AAAAAAAA0000000000000000AAA00000AAA
    AAAAA00000000000000000A00000000000000000000000000000000000000000
    000000000000000000000000000000000000000000000000000000000000FFFF
    FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF83FFFFFFFBFFFFFF83FFFFFFFBFFFFF
    FFBFFFFFFFBFF7FFF001E3FFF001C1FFF00180000001C1FFF001E3FFF001F7FF
    FFDFF7FFFFDFF7FFFFDFF7FFFFDFF7FFFFDFF7FFFFDFF7FFFFDFF7FFFFDF003F
    FF8F003FFF0700000003003FFF07003FFF8F003FFFDFFFFFFFFFFFFFFFFF}
  KeyPreview = True
  OldCreateOrder = False
  Position = poDesktopCenter
  ShowHint = True
  Visible = True
  OnCloseQuery = FormCloseQuery
  OnCreate = FormCreate
  OnDestroy = FormDestroy
  PixelsPerInch = 96
  TextHeight = 13
  object Splitter1: TSplitter
    Left = 589
    Top = 24
    Height = 493
    Align = alRight
    Color = 10930928
    ParentColor = False
    OnCanResize = Splitter1CanResize
    OnMoved = Splitter1Moved
    ExplicitLeft = 604
  end
  object Status: TStatusBar
    Left = 0
    Top = 517
    Width = 800
    Height = 19
    Panels = <
      item
        Width = 32
      end
      item
        Width = 40
      end
      item
        Width = 40
      end
      item
        Width = 200
      end
      item
        Style = psOwnerDraw
        Width = 60
      end
      item
        Width = 50
      end>
    OnDrawPanel = StatusDrawPanel
  end
  object ActionMainMenuBar1: TActionMainMenuBar
    Left = 0
    Top = 0
    Width = 800
    Height = 24
    UseSystemFont = False
    ActionManager = ActionManager
    Caption = 'ActionMainMenuBar1'
    ColorMap.HighlightColor = 15660791
    ColorMap.BtnSelectedColor = clBtnFace
    ColorMap.UnusedColor = 15660791
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -11
    Font.Name = 'Tahoma'
    Font.Style = []
    Spacing = 5
  end
  object Juntador: TPanel
    Left = 592
    Top = 24
    Width = 208
    Height = 493
    Align = alRight
    BevelOuter = bvNone
    TabOrder = 2
    object PaiScroller: TPanel
      Left = 0
      Top = 0
      Width = 208
      Height = 24
      Align = alTop
      BevelOuter = bvLowered
      BorderWidth = 1
      TabOrder = 0
    end
    object Opcoes: TPageControl
      Left = 0
      Top = 24
      Width = 208
      Height = 469
      ActivePage = TabSheet1
      Align = alClient
      OwnerDraw = True
      Style = tsButtons
      TabOrder = 1
      object TabSheet1: TTabSheet
        Caption = 'Sele'#231#227'o'
        TabVisible = False
        object Splitter2: TSplitter
          Left = 0
          Top = 364
          Width = 200
          Height = 3
          Cursor = crVSplit
          Align = alBottom
          Color = 10930928
          MinSize = 15
          ParentColor = False
          OnCanResize = SplitterFDPCanResize
          ExplicitTop = 0
          ExplicitWidth = 376
        end
        object PanEditor: TPanel
          Left = 0
          Top = 0
          Width = 200
          Height = 364
          Align = alClient
          BevelInner = bvRaised
          BevelOuter = bvLowered
          TabOrder = 0
        end
        object PanHelp: TPanel
          Left = 0
          Top = 367
          Width = 200
          Height = 92
          Align = alBottom
          BevelInner = bvRaised
          BevelOuter = bvLowered
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsItalic]
          ParentFont = False
          TabOrder = 1
          object lbl_ajuda: TLabel
            Left = 2
            Top = 2
            Width = 196
            Height = 88
            Align = alClient
            Color = clMoneyGreen
            Font.Charset = ANSI_CHARSET
            Font.Color = clWindowText
            Font.Height = -12
            Font.Name = 'Times New Roman'
            Font.Style = [fsItalic]
            ParentColor = False
            ParentFont = False
            WordWrap = True
            ExplicitWidth = 3
            ExplicitHeight = 15
          end
        end
      end
      object TabSheet2: TTabSheet
        Caption = 'Atr. ocultos'
        ImageIndex = 1
        TabVisible = False
        object ToolBar4: TToolBar
          Left = 0
          Top = 0
          Width = 200
          Height = 25
          AutoSize = True
          ButtonHeight = 21
          ButtonWidth = 38
          Caption = 'ToolBar4'
          EdgeBorders = [ebLeft, ebTop, ebRight]
          Flat = False
          ShowCaptions = True
          TabOrder = 0
          object ao_Novo: TToolButton
            Left = 0
            Top = 2
            Caption = 'Novo'
            ImageIndex = 0
            OnClick = ao_NovoClick
          end
          object ao_Editar: TToolButton
            Left = 38
            Top = 2
            Caption = 'Editar'
            ImageIndex = 2
            OnClick = ao_EditarClick
          end
          object ToolButton17: TToolButton
            Left = 76
            Top = 2
            Width = 8
            Caption = 'ToolButton17'
            ImageIndex = 2
            Style = tbsSeparator
          end
          object ao_Excluir: TToolButton
            Left = 84
            Top = 2
            Caption = 'Excluir'
            ImageIndex = 1
            OnClick = ao_ExcluirClick
          end
        end
        object TreeAtt: TTreeView
          Left = 0
          Top = 50
          Width = 200
          Height = 409
          Align = alClient
          Images = brDM.attImg
          Indent = 19
          ReadOnly = True
          TabOrder = 1
          OnClick = TreeAttClick
        end
        object ToolBar5: TToolBar
          Left = 0
          Top = 25
          Width = 200
          Height = 25
          AutoSize = True
          ButtonHeight = 21
          ButtonWidth = 105
          Caption = 'ToolBar5'
          EdgeBorders = [ebLeft, ebRight, ebBottom]
          Flat = False
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsBold]
          ParentFont = False
          ShowCaptions = True
          TabOrder = 2
          object ao_exibir: TToolButton
            Left = 0
            Top = 2
            Caption = 'Exibir no  modelo'
            ImageIndex = 0
            OnClick = ao_exibirClick
          end
        end
      end
    end
  end
  object Tool: TToolBar
    Left = 0
    Top = 24
    Width = 23
    Height = 493
    Align = alLeft
    AutoSize = True
    Caption = 'Tool'
    Color = clBtnFace
    EdgeBorders = [ebTop, ebBottom]
    Images = brDM.img
    ParentColor = False
    TabOrder = 3
    object ToolButton1: TToolButton
      Left = 0
      Top = 0
      Action = criar_Cancelar
      Wrap = True
    end
    object ToolButton2: TToolButton
      Left = 0
      Top = 22
      Action = criar_Entidade
      Wrap = True
    end
    object ToolButton3: TToolButton
      Left = 0
      Top = 44
      Action = criar_relacionamento
      Wrap = True
    end
    object ToolButton4: TToolButton
      Left = 0
      Top = 66
      Action = criar_multiRelacao
      Wrap = True
    end
    object ToolButton5: TToolButton
      Left = 0
      Top = 88
      Action = criar_GerEsp
      Wrap = True
    end
    object ToolButton12: TToolButton
      Left = 0
      Top = 110
      Action = Criar_espA
      Wrap = True
    end
    object ToolButton13: TToolButton
      Left = 0
      Top = 132
      Action = Criar_espB
      Wrap = True
    end
    object ToolButton6: TToolButton
      Left = 0
      Top = 154
      Action = criar_atributo
      Wrap = True
    end
    object ToolButton20: TToolButton
      Left = 0
      Top = 176
      Hint = 'Atributo identificador'
      Action = criar_attID
      Wrap = True
    end
    object ToolButton16: TToolButton
      Left = 0
      Top = 198
      Hint = 'Atributo composto'
      Action = criar_attComp
      Wrap = True
    end
    object ToolButton18: TToolButton
      Left = 0
      Top = 220
      Hint = 'Atributo opcional'
      Action = criar_attOpc
      Wrap = True
    end
    object ToolButton19: TToolButton
      Left = 0
      Top = 242
      Hint = 'Atributo multivalorado'
      Action = criar_attMult
      Wrap = True
    end
    object ToolButton7: TToolButton
      Left = 0
      Top = 264
      Hint = 'Auto-relacionar'
      Action = criar_altorelacionamento
      Wrap = True
    end
    object ToolButton11: TToolButton
      Left = 0
      Top = 286
      Action = criar_ligacao
    end
    object ToolButton29: TToolButton
      Left = 0
      Top = 286
      Width = 23
      Caption = 'ToolButton29'
      ImageIndex = 11
      Wrap = True
      Style = tbsSeparator
    end
    object ToolButton33: TToolButton
      Left = 0
      Top = 331
      Action = Criar_TextoII
      Wrap = True
    end
    object ToolButton8: TToolButton
      Left = 0
      Top = 353
      Action = criar_texto
      Wrap = True
    end
    object ToolButton9: TToolButton
      Left = 0
      Top = 375
      Action = del_base
      Wrap = True
    end
    object ToolButton10: TToolButton
      Left = 0
      Top = 397
      Action = Del
    end
  end
  object pb: TPanel
    Left = 46
    Top = 24
    Width = 543
    Height = 493
    Align = alClient
    BevelOuter = bvNone
    TabOrder = 4
    object SplitterFDP: TSplitter
      Left = 0
      Top = 453
      Width = 543
      Height = 3
      Cursor = crVSplit
      Align = alBottom
      Color = 10930928
      MinSize = 15
      ParentColor = False
      OnCanResize = SplitterFDPCanResize
      ExplicitWidth = 558
    end
    object Box: TScrollBox
      Left = 0
      Top = 24
      Width = 543
      Height = 429
      HorzScrollBar.Smooth = True
      HorzScrollBar.Style = ssFlat
      VertScrollBar.Smooth = True
      VertScrollBar.Style = ssFlat
      Align = alClient
      TabOrder = 0
      OnMouseWheelDown = BoxMouseWheelDown
      OnMouseWheelUp = BoxMouseWheelUp
    end
    object baseme: TPanel
      Left = 0
      Top = 0
      Width = 543
      Height = 24
      Align = alTop
      BevelOuter = bvNone
      TabOrder = 1
      object ToolBar3: TToolBar
        Left = 313
        Top = 0
        Width = 230
        Height = 24
        Align = alClient
        AutoSize = True
        ButtonHeight = 21
        ButtonWidth = 101
        Caption = 'ToolBar3'
        EdgeBorders = [ebLeft, ebTop]
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'MS Sans Serif'
        Font.Style = [fsBold]
        ParentFont = False
        ShowCaptions = True
        TabOrder = 0
        object ToolButton14: TToolButton
          Left = 0
          Top = 0
          Caption = 'Modelos abertos'
          DropdownMenu = MenuModelos
          ImageIndex = 2
          Style = tbsDropDown
          OnClick = Todos_modelosExecute
        end
        object ToolButton15: TToolButton
          Left = 114
          Top = 0
          Caption = 'Localizar objeto'
          DropdownMenu = MenuObjetos
          ImageIndex = 2
          Style = tbsDropDown
          OnClick = Todos_objetosExecute
        end
      end
      object Panel2: TPanel
        Left = 0
        Top = 0
        Width = 313
        Height = 24
        Align = alLeft
        BevelOuter = bvNone
        TabOrder = 1
        object ToolBar2: TToolBar
          Left = 0
          Top = 0
          Width = 313
          Height = 24
          Align = alLeft
          Caption = 'ToolBar2'
          EdgeBorders = [ebLeft, ebTop]
          Images = brDM.img
          TabOrder = 0
          object ToolButton35: TToolButton
            Left = 0
            Top = 0
            Action = arq_novo
          end
          object ToolButton36: TToolButton
            Left = 23
            Top = 0
            Action = NovoLogico
          end
          object ToolButton37: TToolButton
            Left = 46
            Top = 0
            Action = arq_abrir
          end
          object ToolButton41: TToolButton
            Left = 69
            Top = 0
            Width = 8
            Caption = 'ToolButton41'
            ImageIndex = 33
            Style = tbsSeparator
          end
          object ToolButton45: TToolButton
            Left = 77
            Top = 0
            Action = autoSalvar
          end
          object ToolButton42: TToolButton
            Left = 100
            Top = 0
            Action = arq_Salvar
          end
          object ToolButton38: TToolButton
            Left = 123
            Top = 0
            Action = arq_fechar
          end
          object ToolButton40: TToolButton
            Left = 146
            Top = 0
            Width = 8
            Caption = 'ToolButton40'
            ImageIndex = 32
            Style = tbsSeparator
          end
          object ToolButton39: TToolButton
            Left = 154
            Top = 0
            Action = Imprimir
          end
          object ToolButton47: TToolButton
            Left = 177
            Top = 0
            Width = 8
            Caption = 'ToolButton47'
            ImageIndex = 43
            Style = tbsSeparator
          end
          object ToolButton43: TToolButton
            Left = 185
            Top = 0
            Action = edt_Desfazer
          end
          object ToolButton44: TToolButton
            Left = 208
            Top = 0
            Action = edt_Refazer
          end
          object ToolButton46: TToolButton
            Left = 231
            Top = 0
            Width = 8
            Caption = 'ToolButton46'
            ImageIndex = 42
            Style = tbsSeparator
          end
        end
      end
    end
    object Util: TRichEdit
      Left = 0
      Top = 456
      Width = 543
      Height = 37
      Align = alBottom
      Color = 16711360
      ReadOnly = True
      ScrollBars = ssVertical
      TabOrder = 2
      WordWrap = False
    end
  end
  object ToolLogica: TToolBar
    Left = 23
    Top = 24
    Width = 23
    Height = 493
    Align = alLeft
    AutoSize = True
    Caption = 'ToolLogica'
    EdgeBorders = [ebTop, ebBottom]
    Images = brDM.img
    TabOrder = 5
    object ToolButton32: TToolButton
      Left = 0
      Top = 0
      Action = criar_Cancelar
      Wrap = True
    end
    object ToolButton21: TToolButton
      Left = 0
      Top = 22
      Action = LCriar_tabela
      Wrap = True
    end
    object ToolButton22: TToolButton
      Left = 0
      Top = 44
      Action = LCriar_Relacao
      Wrap = True
    end
    object ToolButton23: TToolButton
      Left = 0
      Top = 66
      Action = LCriar_campo
      Wrap = True
    end
    object ToolButton24: TToolButton
      Left = 0
      Top = 88
      Action = LCriar_Fk
      Wrap = True
    end
    object ToolButton25: TToolButton
      Left = 0
      Top = 110
      Action = LCriar_K
      Wrap = True
    end
    object ToolButton26: TToolButton
      Left = 0
      Top = 132
      Action = LCriar_separador
    end
    object ToolButton27: TToolButton
      Left = 0
      Top = 132
      Width = 23
      Caption = 'ToolButton27'
      ImageIndex = 26
      Wrap = True
      Style = tbsSeparator
    end
    object ToolButton34: TToolButton
      Left = 0
      Top = 177
      Action = Criar_TextoII
      Wrap = True
    end
    object ToolButton28: TToolButton
      Left = 0
      Top = 199
      Action = criar_texto
      Wrap = True
    end
    object ToolButton30: TToolButton
      Left = 0
      Top = 221
      Action = del_base
      Wrap = True
    end
    object ToolButton31: TToolButton
      Left = 0
      Top = 243
      Action = Del
      Wrap = True
    end
  end
  object ActionManager: TActionManager
    ActionBars = <
      item
        Items = <
          item
            Action = arq_abrir
          end
          item
            Action = arq_novo
            ShortCut = 16462
          end
          item
            Action = arq_novo
            ShortCut = 16462
          end>
      end
      item
      end
      item
      end
      item
      end
      item
        Items = <
          item
            Items = <
              item
                Action = arq_novo
                ImageIndex = 29
                ShortCut = 16462
              end
              item
                Action = NovoLogico
                ImageIndex = 28
                ShortCut = 16460
              end
              item
                Action = arq_abrir
                ImageIndex = 33
              end
              item
                Items = <
                  item
                    Visible = False
                    Action = act1
                  end
                  item
                    Visible = False
                    Action = act2
                  end
                  item
                    Visible = False
                    Action = act3
                  end
                  item
                    Visible = False
                    Action = act4
                  end
                  item
                    Visible = False
                    Action = act5
                  end>
                Caption = 'Rea&brir'
                UsageCount = 1
              end
              item
                Action = arq_fechar
                ImageIndex = 30
              end
              item
                Caption = '-'
              end
              item
                Action = Imprimir
                ImageIndex = 31
              end
              item
                Items = <
                  item
                    Action = modExportBMP
                    Caption = '&Exportar para Bitmap'
                  end
                  item
                    Action = modExportJPG
                  end>
                Caption = '&Exportar para imagem'
                UsageCount = 1
              end
              item
                Action = dicFull
                Caption = '&Gerar dicion'#225'rio do esquema'
                ShortCut = 123
              end
              item
                Caption = '-'
              end
              item
                Items = <
                  item
                    Action = verLogs
                    Caption = '&Exibir logs de opera'#231#245'es'
                  end
                  item
                    Action = limpar_logs
                    Caption = '&Limpar logs'
                  end
                  item
                    Action = salva_logs
                    Caption = '&Salvar logs'
                  end>
                Caption = 'Log &de opera'#231#245'es'
                UsageCount = 1
              end
              item
                Action = xsl_maker
                Caption = '&Visualizar Esquema XML com XSLT'
              end
              item
                Caption = '-'
              end
              item
                Action = arq_Salvar
                ImageIndex = 32
              end
              item
                Action = arq_salvarc
              end
              item
                Caption = '-'
              end
              item
                Action = cfg
                Caption = 'Config&ura'#231#245'es...'
                ImageIndex = 34
              end
              item
                Action = sis_sair
              end>
            Caption = '&Sistema'
          end
          item
            Items = <
              item
                Action = edt_Desfazer
                Caption = 'D&esfazer'
                ImageIndex = 42
                ShortCut = 16474
              end
              item
                Action = edt_Refazer
                Caption = 'Re&fazer'
                ImageIndex = 41
                ShortCut = 16466
              end
              item
                Action = Exibir_fonte
                ShortCut = 16454
              end
              item
                Caption = '-'
              end
              item
                Action = edt_copy
                ShortCut = 16451
              end
              item
                Action = edt_cut
                ShortCut = 16472
              end
              item
                Action = edt_paste
                ShortCut = 16470
              end>
            Caption = 'E&ditar'
            UsageCount = 1
          end
          item
            Items = <
              item
                Items = <
                  item
                    Action = criar_Cancelar
                    Caption = '&Cancelar'
                    ImageIndex = 3
                  end
                  item
                    Caption = '-'
                  end
                  item
                    Action = criar_Entidade
                    Caption = '&Entidade'
                    ImageIndex = 4
                  end
                  item
                    Action = criar_relacionamento
                    Caption = '&Relacionamento'
                    ImageIndex = 8
                  end
                  item
                    Action = criar_multiRelacao
                    Caption = 'E&ntidade Assossiativa'
                    ImageIndex = 7
                  end
                  item
                    Caption = '-'
                  end
                  item
                    Action = criar_GerEsp
                    Caption = 'E&specializa'#231#227'o'
                    ImageIndex = 5
                  end
                  item
                    Action = Criar_espA
                    Caption = 'Es&pecializa'#231#227'o (A)'
                    ImageIndex = 12
                  end
                  item
                    Action = Criar_espB
                    Caption = 'Espec&ializa'#231#227'o (B)'
                    ImageIndex = 11
                  end
                  item
                    Action = criar_atributo
                    Caption = '&Atributo'
                    ImageIndex = 17
                  end
                  item
                    Action = criar_attID
                    Caption = 'Atributo i&dentificador'
                    ImageIndex = 0
                  end
                  item
                    Action = criar_attComp
                    Caption = 'Atributo co&mposto'
                    ImageIndex = 18
                  end
                  item
                    Action = criar_attOpc
                    Caption = 'A&tributo opcional'
                    ImageIndex = 16
                  end
                  item
                    Action = criar_attMult
                    Caption = 'Atri&buto multivalorado'
                    ImageIndex = 19
                  end
                  item
                    Action = criar_altorelacionamento
                    Caption = 'A&uto-Relacionar'
                    ImageIndex = 1
                  end
                  item
                    Action = criar_ligacao
                    Caption = '&Liga'#231#227'o'
                    ImageIndex = 6
                  end
                  item
                    Caption = '-'
                  end
                  item
                    Action = Criar_TextoII
                    Caption = 'Text&o (Sem moldura)'
                    ImageIndex = 27
                  end
                  item
                    Action = criar_texto
                    Caption = 'Te&xto (Com moldura)'
                    ImageIndex = 9
                  end>
                Caption = 'Cr&iar'
                UsageCount = 1
              end
              item
                Caption = '-'
              end
              item
                Action = ao_Ocultar
                Caption = '&Ocultar atributo'
              end
              item
                Action = ac_orgAtt
                Caption = 'Or&ganizar atributos'
                ShortCut = 16463
              end
              item
                Action = selAtt
                Caption = '&Selecionar atributos'
              end
              item
                Action = promo_ea
                Caption = '&Promover a Entidade Associativa'
              end
              item
                Action = promo_entidade
                Caption = 'P&romover a Entidade'
              end
              item
                Action = covToRest
                Caption = '&Converter Esp. para restrita'
              end
              item
                Action = convToOpc
                Caption = 'Co&nverter Esp. para opcional'
              end
              item
                Caption = '-'
              end
              item
                Action = editarDic
                Caption = '&Dicion'#225'rio de dados do objeto'
                ImageIndex = 26
                ShortCut = 16452
              end
              item
                Caption = '-'
              end
              item
                Action = del_base
                Caption = '&Excluir'
                ImageIndex = 2
              end
              item
                Action = Del
                Caption = 'E&xcluir sele'#231#227'o'
                ImageIndex = 10
              end
              item
                Caption = '-'
              end
              item
                Action = exp_Logico
                Caption = 'Ger&ar Esquema L'#243'gico'
              end>
            Caption = 'Es&quema Conceitual'
          end
          item
            Items = <
              item
                Action = LCriar_tabela
                Caption = '&Criar Tabela'
                ImageIndex = 21
              end
              item
                Action = LCriar_campo
                Caption = 'Cr&iar Campo'
                ImageIndex = 23
              end
              item
                Action = LCriar_Fk
                Caption = 'Cri&ar Campo Chave Est.'
                ImageIndex = 24
              end
              item
                Action = LCriar_K
                Caption = 'Criar Ca&mpo Chave Pri.'
                ImageIndex = 20
              end
              item
                Action = LCriar_separador
                Caption = 'Criar &Separador'
                ImageIndex = 25
              end
              item
                Action = LCriar_Relacao
                Caption = 'C&riar Relacionamento'
                ImageIndex = 22
              end
              item
                Caption = '-'
              end
              item
                Action = editarDicL
                Caption = '&Dicion'#225'rio de dados do objeto'
                ImageIndex = 26
                ShortCut = 16452
              end
              item
                Caption = '-'
              end
              item
                Action = Criar_TextoII
                Caption = '&Texto (Sem moldura)'
                ImageIndex = 27
              end
              item
                Action = criar_texto
                Caption = 'Text&o (Com moldura)'
                ImageIndex = 9
              end
              item
                Caption = '-'
              end
              item
                Action = del_base
                Caption = '&Excluir'
                ImageIndex = 2
              end
              item
                Action = Del
                Caption = 'E&xcluir sele'#231#227'o'
                ImageIndex = 10
              end
              item
                Caption = '-'
              end
              item
                Action = addXSLT
                Caption = 'I&ncluir/alterar arq. formata'#231#227'o XSL'
              end
              item
                Caption = '-'
              end
              item
                Action = fisicoTemplate
                Caption = 'Editar tem&plate de conver'#231#227'o'
                ImageIndex = 34
              end
              item
                Action = GerarFisico
                Caption = '&Gerar Esquema F'#237'sico'
                ImageIndex = 47
              end>
            Caption = '&Esquema L'#243'gico'
          end
          item
            Items = <
              item
                Action = aj_site
                Caption = 'S&ite do brModelo'
              end
              item
                Action = Sobre
              end>
            Caption = '&Ajuda'
          end>
        ActionBar = ActionMainMenuBar1
      end>
    Images = brDM.img
    Left = 296
    Top = 136
    StyleName = 'XP Style'
    object arq_novo: TAction
      Tag = -2
      Category = 'Sistema'
      Caption = '&Novo (Conceitual)'
      Hint = 'Novo modelo conceitual'
      ImageIndex = 29
      ShortCut = 16462
      OnExecute = arq_novoExecute
    end
    object arq_abrir: TAction
      Tag = -2
      Category = 'Sistema'
      Caption = '&Abrir'
      Hint = 'Abrir modelo (L'#243'gico ou Conceitual)'
      ImageIndex = 38
      OnExecute = arq_abrirExecute
    end
    object arq_fechar: TAction
      Category = 'Sistema'
      Caption = '&Fechar'
      Hint = 'Fechar modelo'
      ImageIndex = 37
      OnExecute = arq_fecharExecute
      OnUpdate = arq_fecharUpdate
    end
    object arq_Salvar: TAction
      Category = 'Sistema'
      Caption = '&Salvar'
      Hint = 'Salvar modelo'
      ImageIndex = 39
      OnExecute = arq_SalvarExecute
    end
    object arq_salvarc: TAction
      Category = 'Sistema'
      Caption = 'Salvar &Como...'
      ImageIndex = 40
      OnExecute = arq_salvarcExecute
    end
    object sis_sair: TAction
      Tag = -2
      Category = 'Sistema'
      Caption = 'Sai&r'
      OnExecute = sis_sairExecute
    end
    object criar_Entidade: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Entidade'
      GroupIndex = 1
      Hint = 'Criar entidade'
      ImageIndex = 4
      OnExecute = CriarExecute
      OnUpdate = criar_EntidadeUpdate
    end
    object criar_relacionamento: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Relacionamento'
      GroupIndex = 1
      Hint = 'Criar rela'#231#227'o'
      ImageIndex = 8
      OnExecute = CriarExecute
      OnUpdate = criar_EntidadeUpdate
    end
    object criar_GerEsp: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Especializa'#231#227'o'
      GroupIndex = 1
      Hint = 'Especializa'#231#227'o'
      ImageIndex = 5
      OnExecute = CriarExecute
      OnUpdate = CriarUpdate
    end
    object criar_multiRelacao: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Entidade Assossiativa'
      GroupIndex = 1
      Hint = 'Entidade Associativa'
      ImageIndex = 7
      OnExecute = CriarExecute
      OnUpdate = criar_EntidadeUpdate
    end
    object criar_texto: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Texto (Com moldura)'
      GroupIndex = 1
      Hint = 'Texto (Observa'#231#227'o)'
      ImageIndex = 9
      OnExecute = CriarExecute
    end
    object SavarDT: TAction
      Category = 'tabAction'
      Caption = 'Salvar'
    end
    object ReverterDT: TAction
      Category = 'tabAction'
      Caption = 'Cancelar'
    end
    object Exibir_fonte: TAction
      Category = 'Editar'
      Caption = 'E&ditar Fonte'
      ShortCut = 16454
      OnExecute = Exibir_fonteExecute
      OnUpdate = Exibir_fonteUpdate
    end
    object criar_Cancelar: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Cancelar'
      Checked = True
      GroupIndex = 1
      Hint = 'Cancelar'
      ImageIndex = 3
      OnExecute = CriarExecute
      OnUpdate = criar_CancelarUpdate
    end
    object criar_atributo: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Atributo'
      GroupIndex = 1
      Hint = 'Cria'#231#227'o de atributo'
      ImageIndex = 17
      OnExecute = CriarExecute
      OnUpdate = CriarUpdate
    end
    object criar_ligacao: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Liga'#231#227'o'
      GroupIndex = 1
      Hint = 'Ligar objetos'
      ImageIndex = 6
      OnExecute = CriarExecute
      OnUpdate = criar_ligacaoUpdate
    end
    object criar_altorelacionamento: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Auto-Relacionar'
      GroupIndex = 1
      ImageIndex = 1
      OnExecute = CriarExecute
      OnUpdate = CriarUpdate
    end
    object del_base: TAction
      AutoCheck = True
      Caption = 'Excluir'
      GroupIndex = 1
      Hint = 'Apagar'
      ImageIndex = 2
      OnExecute = CriarExecute
      OnUpdate = CriarUpdate
    end
    object Criar: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Criar'
      OnExecute = CriarExecute
      OnUpdate = CriarUpdate
    end
    object Del: TAction
      Caption = 'Excluir sele'#231#227'o'
      Hint = 'Excluir o objeto selecionado'
      ImageIndex = 10
      OnExecute = DelExecute
    end
    object Criar_espA: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Especializa'#231#227'o (A)'
      GroupIndex = 1
      Hint = 'Especializa'#231#227'o exclusiva com cria'#231#227'o de entidades'
      ImageIndex = 12
      OnExecute = CriarExecute
      OnUpdate = CriarUpdate
    end
    object Criar_espB: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Especializa'#231#227'o (B)'
      GroupIndex = 1
      Hint = 'Especializa'#231#227'o n'#227'o-exclusiva com cria'#231#227'o de entidade'
      ImageIndex = 11
      OnExecute = CriarExecute
      OnUpdate = CriarUpdate
    end
    object promo_ea: TAction
      Caption = 'Promover a Entidade Associativa'
      Enabled = False
      OnExecute = promo_eaExecute
    end
    object promo_entidade: TAction
      Caption = 'Promover a Entidade'
      Enabled = False
      OnExecute = promo_entidadeExecute
    end
    object ao_Ocultar: TAction
      Caption = 'Ocultar atributo'
      Enabled = False
      OnExecute = ao_OcultarExecute
    end
    object ac_orgAtt: TAction
      Caption = 'Organizar atributos'
      Enabled = False
      ShortCut = 16463
      OnExecute = ac_orgAttExecute
    end
    object Imprimir: TAction
      Category = 'Sistema'
      Caption = 'Im&primir...'
      Hint = 'Imprimir modelo'
      ImageIndex = 31
      OnExecute = ImprimirExecute
    end
    object edt_copy: TAction
      Category = 'Editar'
      Caption = '&Copiar'
      ShortCut = 16451
      OnExecute = edt_copyExecute
    end
    object edt_cut: TAction
      Category = 'Editar'
      Caption = '&Recortar'
      ShortCut = 16472
      OnExecute = edt_cutExecute
    end
    object edt_paste: TAction
      Category = 'Editar'
      Caption = 'C&olar'
      ShortCut = 16470
      OnExecute = edt_pasteExecute
    end
    object mod_exibirHint: TAction
      Tag = -2
      AutoCheck = True
      Caption = 
        'Ao mover do mouse sobre o objeto, mostrar o(s) atributo(s) ocult' +
        'o(s)'
      Hint = 'Mostrar HINT de atributo oculto no modelo conceitual'
      OnExecute = mod_exibirHintExecute
    end
    object criar_attOpc: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Atributo opcional'
      GroupIndex = 1
      ImageIndex = 16
      OnExecute = CriarExecute
      OnUpdate = CriarUpdate
    end
    object criar_attMult: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Atributo multivalorado'
      GroupIndex = 1
      ImageIndex = 19
      OnExecute = CriarExecute
      OnUpdate = CriarUpdate
    end
    object criar_attComp: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Atributo composto'
      GroupIndex = 1
      ImageIndex = 18
      OnExecute = CriarExecute
      OnUpdate = CriarUpdate
    end
    object criar_attID: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Atributo identificador'
      GroupIndex = 1
      ImageIndex = 0
      OnExecute = CriarExecute
      OnUpdate = CriarUpdate
    end
    object editarDic: TAction
      Caption = 'Dicion'#225'rio de dados do objeto'
      ImageIndex = 26
      ShortCut = 16452
      OnExecute = editarDicExecute
      OnUpdate = editarDicUpdate
    end
    object covToRest: TAction
      Caption = 'Converter Esp. para restrita'
      Hint = 
        'Converter especializa'#231#245'es opcionais em uma especializa'#231#227'o restri' +
        'ta'
      OnExecute = covToRestExecute
    end
    object convToOpc: TAction
      Caption = 'Converter Esp. para opcional'
      Hint = 
        'Converter uma especializa'#231#227'o restrita em especializa'#231#245'es opciona' +
        'is'
      OnExecute = convToOpcExecute
    end
    object dicFull: TAction
      Category = 'Sistema'
      Caption = 'Gerar dicion'#225'rio do esquema'
      ImageIndex = 35
      ShortCut = 123
      OnExecute = dicFullExecute
    end
    object Sobre: TAction
      Tag = -2
      Category = 'Ajuda'
      Caption = '&Sobre...'
      OnExecute = SobreExecute
    end
    object LCriar_tabela: TAction
      Category = 'Esquema L'#243'gico'
      AutoCheck = True
      Caption = 'Criar Tabela'
      GroupIndex = 1
      Hint = 'Modelo l'#243'gico: Criar Tabela'
      ImageIndex = 21
      OnExecute = CriarExecute
      OnUpdate = criar_EntidadeUpdate
    end
    object LCriar_Relacao: TAction
      Category = 'Esquema L'#243'gico'
      AutoCheck = True
      Caption = 'Criar Relacionamento'
      GroupIndex = 1
      Hint = 'Modelo l'#243'gico: Criar Relacionamento'
      ImageIndex = 22
      OnExecute = CriarExecute
      OnUpdate = LCriar_RelacaoUpdate
    end
    object LCriar_campo: TAction
      Category = 'Esquema L'#243'gico'
      AutoCheck = True
      Caption = 'Criar Campo'
      GroupIndex = 1
      Hint = 'Criar Campo'
      ImageIndex = 23
      OnExecute = CriarExecute
      OnUpdate = LCriar_campoUpdate
    end
    object LCriar_Fk: TAction
      Category = 'Esquema L'#243'gico'
      AutoCheck = True
      Caption = 'Criar Campo Chave Est.'
      GroupIndex = 1
      Hint = 'Criar Campo Chave Estrangeira'
      ImageIndex = 24
      OnExecute = CriarExecute
      OnUpdate = LCriar_campoUpdate
    end
    object LCriar_K: TAction
      Category = 'Esquema L'#243'gico'
      AutoCheck = True
      Caption = 'Criar Campo Chave Pri.'
      GroupIndex = 1
      Hint = 'Criar Campo Chave Prim'#225'ria'
      ImageIndex = 20
      OnExecute = CriarExecute
      OnUpdate = LCriar_campoUpdate
    end
    object cfg: TAction
      Tag = -2
      Category = 'Sistema'
      Caption = 'Configura'#231#245'es...'
      ImageIndex = 34
      OnExecute = cfgExecute
    end
    object LCriar_separador: TAction
      Category = 'Esquema L'#243'gico'
      AutoCheck = True
      Caption = 'Criar Separador'
      GroupIndex = 1
      Hint = 'Criar um separador de campos'
      ImageIndex = 25
      OnExecute = CriarExecute
      OnUpdate = LCriar_campoUpdate
    end
    object editarDicL: TAction
      Category = 'Esquema L'#243'gico'
      Caption = 'Dicion'#225'rio de dados do objeto'
      ImageIndex = 26
      ShortCut = 16452
      OnExecute = editarDicExecute
      OnUpdate = editarDicUpdate
    end
    object exp_Logico: TAction
      Caption = 'Gerar Esquema L'#243'gico'
      Hint = 'Gera modelo l'#243'gico'
      ImageIndex = 35
      OnExecute = exp_LogicoExecute
      OnUpdate = exp_LogicoUpdate
    end
    object NovoLogico: TAction
      Tag = -2
      Category = 'Sistema'
      Caption = 'N&ovo (L'#243'gico)'
      Hint = 'Novo modelo l'#243'gico'
      ImageIndex = 28
      ShortCut = 16460
      OnExecute = NovoLogicoExecute
    end
    object Criar_TextoII: TAction
      Category = 'Criar'
      AutoCheck = True
      Caption = 'Texto (Sem moldura)'
      GroupIndex = 1
      Hint = 'Texto (Observa'#231#227'o)'
      ImageIndex = 27
      OnExecute = CriarExecute
    end
    object verLogs: TAction
      Tag = -2
      Category = 'Log de opera'#231#245'es'
      AutoCheck = True
      Caption = 'Exibir logs de opera'#231#245'es'
      Checked = True
      OnExecute = verLogsExecute
    end
    object limpar_logs: TAction
      Tag = -2
      Category = 'Log de opera'#231#245'es'
      Caption = 'Limpar logs'
      OnExecute = limpar_logsExecute
    end
    object salva_logs: TAction
      Tag = -2
      Category = 'Log de opera'#231#245'es'
      Caption = 'Salvar logs'
      OnExecute = salva_logsExecute
    end
    object autoSalvar: TAction
      Category = 'Sistema'
      Caption = 'Auto Salvar'
      Hint = 'Salvar o modelo automaticamente em tempos pr'#233' configurados'
      ImageIndex = 43
      OnExecute = autoSalvarExecute
      OnUpdate = autoSalvarUpdate
    end
    object act1: TAction
      Category = 'Reabrir'
      Visible = False
      OnExecute = act1Execute
      OnUpdate = act1Update
    end
    object act2: TAction
      Category = 'Reabrir'
      Visible = False
      OnExecute = act1Execute
      OnUpdate = act1Update
    end
    object act3: TAction
      Category = 'Reabrir'
      Visible = False
      OnExecute = act1Execute
      OnUpdate = act1Update
    end
    object act4: TAction
      Category = 'Reabrir'
      Visible = False
      OnExecute = act1Execute
      OnUpdate = act1Update
    end
    object act5: TAction
      Category = 'Reabrir'
      Visible = False
      OnExecute = act1Execute
      OnUpdate = act1Update
    end
    object xsl_maker: TAction
      Category = 'Sistema'
      Caption = 'Visualizar Esquema XML com XSLT'
      Hint = 'Gera XSL para visualizar modelos'
      OnExecute = xsl_makerExecute
    end
    object selAtt: TAction
      Caption = 'Selecionar atributos'
      Hint = 'Seleciona todos os atributos de um objeto.'
      OnExecute = selAttExecute
    end
    object addXSLT: TAction
      Category = 'Esquema L'#243'gico'
      Caption = 'Incluir/alterar arq. formata'#231#227'o XSL'
      OnExecute = addXSLTExecute
      OnUpdate = criar_EntidadeUpdate
    end
    object edt_Desfazer: TAction
      Category = 'Editar'
      Caption = 'Desfazer'
      ImageIndex = 42
      ShortCut = 16474
      OnExecute = edt_DesfazerExecute
      OnHint = edt_DesfazerHint
    end
    object edt_Refazer: TAction
      Category = 'Editar'
      Caption = 'Refazer'
      ImageIndex = 41
      ShortCut = 16466
      OnExecute = edt_RefazerExecute
      OnHint = edt_RefazerHint
      OnUpdate = edt_DesfazerUpdate
    end
    object aj_site: TAction
      Category = 'Ajuda'
      Caption = 'Site do brModelo'
      OnExecute = aj_siteExecute
    end
    object GerarFisico: TAction
      Category = 'Esquema L'#243'gico'
      Caption = 'Gerar Esquema F'#237'sico'
      Enabled = False
      ImageIndex = 47
      OnExecute = GerarFisicoExecute
      OnUpdate = criar_EntidadeUpdate
    end
    object fisicoTemplate: TAction
      Category = 'Esquema L'#243'gico'
      Caption = 'Editar template de conver'#231#227'o'
      ImageIndex = 34
      OnExecute = fisicoTemplateExecute
      OnUpdate = criar_EntidadeUpdate
    end
    object modExportBMP: TAction
      Category = 'Exportar para imagem'
      Caption = 'Exportar para Bitmap'
      OnExecute = modExportBMPExecute
    end
    object modExportJPG: TAction
      Category = 'Exportar para imagem'
      Caption = 'Exportar para JPEG'
      OnExecute = modExportBMPExecute
    end
  end
  object MenuModelos: TPopupMenu
    Images = brDM.attImg
    OnPopup = MenuModelosPopup
    Left = 55
    Top = 66
    object teste1: TMenuItem
      Caption = 'teste'
    end
  end
  object MenuObjetos: TPopupMenu
    Images = brDM.img
    OnPopup = MenuObjetosPopup
    Left = 87
    Top = 66
  end
  object ModeloOpc: TPopupMenu
    Images = brDM.img
    OnPopup = ModeloOpcPopup
    Left = 110
    Top = 119
    object Ocultar1: TMenuItem
      Action = ao_Ocultar
      Caption = 'Ocultar'
    end
    object org1: TMenuItem
      Action = ac_orgAtt
    end
    object Selecionaratributos1: TMenuItem
      Action = selAtt
    end
    object GerarModeloLgico1: TMenuItem
      Action = exp_Logico
    end
    object GerarEsquemaFsico1: TMenuItem
      Action = GerarFisico
    end
    object N3: TMenuItem
      Caption = '-'
    end
    object Copiar1: TMenuItem
      Action = edt_copy
    end
    object Recortar1: TMenuItem
      Action = edt_cut
    end
    object Colar1: TMenuItem
      Action = edt_paste
    end
    object N2: TMenuItem
      Caption = '-'
    end
    object EditarFonte1: TMenuItem
      Action = Exibir_fonte
    end
    object Excluirseleo1: TMenuItem
      Action = Del
    end
    object N1: TMenuItem
      Caption = '-'
    end
    object ImprimirExportar1: TMenuItem
      Action = Imprimir
    end
    object Salvar1: TMenuItem
      Action = arq_Salvar
    end
    object Fechar1: TMenuItem
      Action = arq_fechar
    end
    object Editartemplatedeconvero1: TMenuItem
      Action = fisicoTemplate
    end
  end
  object TimerAutoSava: TTimer
    Interval = 300000
    OnTimer = TimerAutoSavaTimer
    Left = 526
    Top = 152
  end
end
