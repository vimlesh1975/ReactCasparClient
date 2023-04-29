<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Class Form1
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()>
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()>
    Private Sub InitializeComponent()
        Me.Button1 = New System.Windows.Forms.Button()
        Me.cmdConnect = New System.Windows.Forms.Button()
        Me.ComboBox1 = New System.Windows.Forms.ComboBox()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.cmbHost = New System.Windows.Forms.ComboBox()
        Me.lblreqMachInfo = New System.Windows.Forms.Label()
        Me.txtPageName = New System.Windows.Forms.TextBox()
        Me.Label5 = New System.Windows.Forms.Label()
        Me.DataGridView1 = New System.Windows.Forms.DataGridView()
        Me.Column1 = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.Label6 = New System.Windows.Forms.Label()
        Me.txtmosID = New System.Windows.Forms.TextBox()
        Me.cmdreqMachInfo = New System.Windows.Forms.Button()
        Me.lblmsgHeartbeat = New System.Windows.Forms.Label()
        Me.lblCustomObject = New System.Windows.Forms.Label()
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'Button1
        '
        Me.Button1.Location = New System.Drawing.Point(279, 175)
        Me.Button1.Name = "Button1"
        Me.Button1.Size = New System.Drawing.Size(75, 23)
        Me.Button1.TabIndex = 0
        Me.Button1.Text = "Send"
        Me.Button1.UseVisualStyleBackColor = True
        '
        'cmdConnect
        '
        Me.cmdConnect.BackColor = System.Drawing.Color.Red
        Me.cmdConnect.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.cmdConnect.ForeColor = System.Drawing.SystemColors.ButtonHighlight
        Me.cmdConnect.Location = New System.Drawing.Point(220, 8)
        Me.cmdConnect.Name = "cmdConnect"
        Me.cmdConnect.Size = New System.Drawing.Size(107, 35)
        Me.cmdConnect.TabIndex = 1
        Me.cmdConnect.Text = "Connect"
        Me.cmdConnect.UseVisualStyleBackColor = False
        '
        'ComboBox1
        '
        Me.ComboBox1.FormattingEnabled = True
        Me.ComboBox1.Items.AddRange(New Object() {"10540", "10541", "10542", "", "11000", "12000", "13000"})
        Me.ComboBox1.Location = New System.Drawing.Point(88, 42)
        Me.ComboBox1.Name = "ComboBox1"
        Me.ComboBox1.Size = New System.Drawing.Size(65, 21)
        Me.ComboBox1.TabIndex = 2
        Me.ComboBox1.Text = "10540"
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Location = New System.Drawing.Point(41, 41)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(26, 13)
        Me.Label1.TabIndex = 4
        Me.Label1.Text = "Port"
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Location = New System.Drawing.Point(38, 20)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(29, 13)
        Me.Label2.TabIndex = 6
        Me.Label2.Text = "Host"
        '
        'cmbHost
        '
        Me.cmbHost.FormattingEnabled = True
        Me.cmbHost.Items.AddRange(New Object() {"localhost", "127.0.0.1", "192.168.1.10", "192.168.15.157"})
        Me.cmbHost.Location = New System.Drawing.Point(88, 17)
        Me.cmbHost.Name = "cmbHost"
        Me.cmbHost.Size = New System.Drawing.Size(117, 21)
        Me.cmbHost.TabIndex = 5
        Me.cmbHost.Text = "127.0.0.1"
        '
        'lblreqMachInfo
        '
        Me.lblreqMachInfo.AutoSize = True
        Me.lblreqMachInfo.Location = New System.Drawing.Point(607, 102)
        Me.lblreqMachInfo.Name = "lblreqMachInfo"
        Me.lblreqMachInfo.Size = New System.Drawing.Size(77, 13)
        Me.lblreqMachInfo.TabIndex = 8
        Me.lblreqMachInfo.Text = "lblreqMachInfo"
        '
        'txtPageName
        '
        Me.txtPageName.Location = New System.Drawing.Point(119, 172)
        Me.txtPageName.Name = "txtPageName"
        Me.txtPageName.Size = New System.Drawing.Size(140, 20)
        Me.txtPageName.TabIndex = 9
        Me.txtPageName.Text = "InOut"
        '
        'Label5
        '
        Me.Label5.AutoSize = True
        Me.Label5.Location = New System.Drawing.Point(22, 175)
        Me.Label5.Name = "Label5"
        Me.Label5.Size = New System.Drawing.Size(82, 13)
        Me.Label5.TabIndex = 10
        Me.Label5.Text = "Template Name"
        '
        'DataGridView1
        '
        Me.DataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.DataGridView1.Columns.AddRange(New System.Windows.Forms.DataGridViewColumn() {Me.Column1})
        Me.DataGridView1.Location = New System.Drawing.Point(14, 198)
        Me.DataGridView1.Name = "DataGridView1"
        Me.DataGridView1.Size = New System.Drawing.Size(248, 150)
        Me.DataGridView1.TabIndex = 11
        '
        'Column1
        '
        Me.Column1.HeaderText = "Column1"
        Me.Column1.Name = "Column1"
        Me.Column1.Width = 200
        '
        'Label6
        '
        Me.Label6.AutoSize = True
        Me.Label6.Location = New System.Drawing.Point(30, 70)
        Me.Label6.Name = "Label6"
        Me.Label6.Size = New System.Drawing.Size(37, 13)
        Me.Label6.TabIndex = 13
        Me.Label6.Text = "mosID"
        '
        'txtmosID
        '
        Me.txtmosID.Location = New System.Drawing.Point(88, 69)
        Me.txtmosID.Name = "txtmosID"
        Me.txtmosID.Size = New System.Drawing.Size(107, 20)
        Me.txtmosID.TabIndex = 14
        Me.txtmosID.Text = "mosID_RCC"
        '
        'cmdreqMachInfo
        '
        Me.cmdreqMachInfo.Location = New System.Drawing.Point(653, 66)
        Me.cmdreqMachInfo.Name = "cmdreqMachInfo"
        Me.cmdreqMachInfo.Size = New System.Drawing.Size(97, 23)
        Me.cmdreqMachInfo.TabIndex = 15
        Me.cmdreqMachInfo.Text = "reqMachInfo"
        Me.cmdreqMachInfo.UseVisualStyleBackColor = True
        '
        'lblmsgHeartbeat
        '
        Me.lblmsgHeartbeat.AutoSize = True
        Me.lblmsgHeartbeat.Location = New System.Drawing.Point(342, 17)
        Me.lblmsgHeartbeat.Name = "lblmsgHeartbeat"
        Me.lblmsgHeartbeat.Size = New System.Drawing.Size(55, 13)
        Me.lblmsgHeartbeat.TabIndex = 17
        Me.lblmsgHeartbeat.Text = "HeartBeat"
        '
        'lblCustomObject
        '
        Me.lblCustomObject.AutoSize = True
        Me.lblCustomObject.Location = New System.Drawing.Point(276, 201)
        Me.lblCustomObject.Name = "lblCustomObject"
        Me.lblCustomObject.Size = New System.Drawing.Size(76, 13)
        Me.lblCustomObject.TabIndex = 18
        Me.lblCustomObject.Text = "Custom Object"
        '
        'Form1
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(861, 359)
        Me.Controls.Add(Me.lblCustomObject)
        Me.Controls.Add(Me.lblmsgHeartbeat)
        Me.Controls.Add(Me.cmdreqMachInfo)
        Me.Controls.Add(Me.txtmosID)
        Me.Controls.Add(Me.Label6)
        Me.Controls.Add(Me.DataGridView1)
        Me.Controls.Add(Me.Label5)
        Me.Controls.Add(Me.txtPageName)
        Me.Controls.Add(Me.lblreqMachInfo)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.cmbHost)
        Me.Controls.Add(Me.Label1)
        Me.Controls.Add(Me.ComboBox1)
        Me.Controls.Add(Me.cmdConnect)
        Me.Controls.Add(Me.Button1)
        Me.Name = "Form1"
        Me.Text = "Form1"
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents Button1 As Button
    Friend WithEvents cmdConnect As Button
    Friend WithEvents ComboBox1 As ComboBox
    Friend WithEvents Label1 As Label
    Friend WithEvents Label2 As Label
    Friend WithEvents cmbHost As ComboBox
    Friend WithEvents lblreqMachInfo As Label
    Friend WithEvents txtPageName As TextBox
    Friend WithEvents Label5 As Label
    Friend WithEvents DataGridView1 As DataGridView
    Friend WithEvents Column1 As DataGridViewTextBoxColumn
    Friend WithEvents Label6 As Label
    Friend WithEvents txtmosID As TextBox
    Friend WithEvents cmdreqMachInfo As Button
    Friend WithEvents lblmsgHeartbeat As Label
    Friend WithEvents lblCustomObject As Label
End Class
